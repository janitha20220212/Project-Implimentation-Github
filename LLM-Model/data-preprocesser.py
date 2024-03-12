def main():

    # imports re module which provides support for regular expressions to be used in the python program
    import re
    # imports the pandas module which is used for data manipulation and analysis
    import pandas as pd

    # reads the data from the provided file and stores it in a variable called data
    # the reason for sep='\t' is because the data is separated by tabs
    data = pd.read_csv('./LLM-Model/spoiler.tsv', sep='\t')

    # a function called preprocess_data which will preprocess the provided data by cleaning it and removing any unwanted characters


    def preprocess_data(text):

        # reference to regular expression codes: https://regex101.com/

        # remove any special characters and punctuation from the text
        text = re.sub(r'[^\w\s]', '', text)

        # remove any singular characters from the text like 'a' or 'I'
        text = re.sub(r'\b\w\b', '', text)

        # remove all HTML tags from the text
        text = re.sub(r'<.*?>', '', text)

        # change all the text to lowercase
        text = text.lower()

        # remove any extra spaces from the text
        # reference: https://stackoverflow.com/questions/1185524/how-do-i-trim-whitespace
        text = re.sub(r'\s+', ' ', text)

        # remove any leading or trailing spaces from the text
        # reference: https://www.geeksforgeeks.org/python-string-strip/
        text = text.strip()

        # returns the cleaned text
        return text


    # iterates through the data and preprocesses the text in each row
    for i in range(len(data['text'])):
        data['text'][i] = preprocess_data(data['text'][i])

    # saves the preprocessed data to a new file called 'preprocessed_data.tsv'
    data.to_csv('./LLM-Model/preprocessed_data.tsv', sep='\t', index=False)

if __name__ == "__main__":
    main()