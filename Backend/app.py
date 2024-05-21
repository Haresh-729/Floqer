import streamlit as st
import os
from dotenv import load_dotenv
import csv
from langchain.schema import Document
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from langchain_community.llms import OpenAI
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnableSequence

# Load environment variables
load_dotenv()

# Ensure the OpenAI API key is set
if not os.getenv("OPENAI_API_KEY"):
    raise EnvironmentError("OpenAI API key not found in environment variables.")

# Custom function to load CSV and handle encoding
def load_csv(file_path, encoding="utf-8"):
    documents = []
    with open(file_path, mode='r', encoding=encoding) as csvfile:
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            text = " ".join(row.values())
            documents.append(Document(page_content=text))
    return documents

# Step 1: Load and vectorize the sales response CSV data
documents = load_csv("sales_response.csv")
print(f"Loaded {len(documents)} documents")
print(documents[0].page_content)

# Step 2: Create embeddings and store them in a FAISS vector store
embeddings = OpenAIEmbeddings()
db = FAISS.from_documents(documents, embeddings)
print("Documents have been embedded and stored in FAISS")

# # Step 3: Define a similarity search function
def similarity_search(query, k=5):
    results = db.similarity_search(query, k=k)
    print("Returned the result..!")
    page_contents_array = [doc.page_content for doc in results]
    print("Returned the result array..!")
    print(results)
    print(page_contents_array)
    return results

# # Step 4: Setup LLMChain & prompts
# llm = OpenAI(model="gpt-3.5-turbo-16k-0613")
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-16k-0613")
template = """
You are a world class business development representative. 
I will share a prospect's message with you and you will give me the best answer that 
I should send to this prospect based on past best practies, 
and you will follow ALL of the rules below:

1/ Response should be very similar or even identical to the past best practies, 
in terms of length, ton of voice, logical arguments and other details

2/ If the best practice are irrelevant, then try to mimic the style of the best practice to prospect's message

Below is a message I received from the prospect:
{message}

Here is a list of best practies of how we normally respond to prospect in similar scenarios:
{best_practice}

Please write the best response that I should send to this prospect:
"""

prompt = PromptTemplate(
    input_variables=["message", "best_practice"],
    template=template
)

# chain = LLMChain(llm=llm, prompt=prompt)
# chain = RunnableSequence(prompt | llm)
chain = LLMChain(llm=llm, prompt=prompt)

# # Step 5: Retrieval-augmented generation
def generate_response(message):
    best_practice = similarity_search(message)
    response = chain.run(message=message, best_practice=best_practice)
    return response

# # Example usage
query = "Can you help me with my cencelling my order?"
response = generate_response(query)
print(response)

# 5. Build an app with streamlit
def main():
    st.set_page_config(
        page_title="Customer response generator", page_icon="👨‍💻")

    st.header("Customer response generator 👨‍💻")
    message = st.text_area("customer message")

    if message:
        st.write("Generating message...")

        result = generate_response(message)

        st.info(result)


if __name__ == '__main__':
    main()


# Step 1: Load and vectorize the sales response CSV data
# 2. Function of Similarity search.
# 3. Setup LLMChain & prompts
# 4. Retrival agumented generation.

