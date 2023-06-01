const Excel = require("exceljs");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-L9YHbc4YsSjFizpGJ6Lcw54q",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

let progress = 0;

exports.processExcelFileV2 = async (inputBuffer) => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(inputBuffer);
  const sheet = workbook.getWorksheet(1);

  console.log("Worksheet loaded"); // Add this line for debugging

  const totalRows = sheet.rowCount;

  let row = 2;
  while (true) {
    try {
      console.log(totalRows);
      console.log(row);
      const inputText1 = sheet.getCell(`A${row}`).value;
      const inputText2 = sheet.getCell(`B${row}`).value;
      progress = (row - 1) / totalRows;
      console.log(`Processing row ${row}`); // Add this line for debugging

      if (!inputText1) {
        console.log(
          `Exiting loop at row ${row} because inputText1 is not valid:`,
          inputText1
        );
        break;
      }
      const inputText = `${inputText1} ${inputText2}`;
      console.log(inputText);
      const messages = [
        {
          role: "system",
          content: "You are a professional content writer.",
        },
        {
          role: "user",
          content: `(Dont forget its very importent to separate responce with | delimiter) Write name, description (description needs to be with features as pointers), SEO meta name, meta description, and meta keywords for this data: '${inputText}'. Separate name, description, SEO meta name, meta description, and meta keywords by the delimiter '|'. and also make the description in HTML format like new lin <br> and pointer lists with <ul> and use <strong> only for features : title so like this <strong>Features :</strong> and dont use it elseware.`,
        },
      ];

      const responseText = await generateChatCompletion(messages);
      const responses = responseText.split("|");

      for (let i = 0; i < responses.length; i++) {
        sheet.getCell(`${String.fromCharCode(67 + i)}${row}`).value =
          responses[i].trim();
      }
      row++;
    } catch (error) {
      // console.error(`Error while processing row ${row}:`, error);
      row++;
    }
  }

  const outputBuffer = await workbook.xlsx.writeBuffer();
  // console.log("Output buffer:", outputBuffer); // Add this line for debugging

  return outputBuffer;
};

exports.getProgress = () => {
  return progress;
};
exports.processExcelFileForTranslation = async (
  inputBuffer,
  sourceLanguage,
  targetLanguage,
  systemRoleContent
) => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.load(inputBuffer);
  const sheet = workbook.getWorksheet(1);

  let row = 1;
  while (true) {
    const inputText = sheet.getCell(`A${row}`).value;

    if (!inputText) {
      break;
    }

    const messages = [
      {
        role: "system",
        content: `You are a professional Translator from Language ${sourceLanguage} to Language ${targetLanguage} in ${systemRoleContent}.`,
      },
      {
        role: "user",
        content: `Translate the following text from ${sourceLanguage} to ${targetLanguage}: ${inputText}`,
      },
    ];

    const translation = await generateTranslation(messages);

    sheet.getCell(`B${row}`).value = translation;

    row++;
  }

  const outputBuffer = await workbook.xlsx.writeBuffer();

  return outputBuffer;
};

async function generateChatCompletion(
  messages,
  model = "gpt-4",
  temperature = 1,
  maxTokens = null
) {
  const data = {
    model,
    messages,
    temperature,
  };

  if (maxTokens !== null) {
    data.max_tokens = maxTokens;
  }
  console.log("Generating chat completion"); // Add this line for debugging
  try {
    const response = await openai.createChatCompletion(data);
    console.log("Chat completion response ok"); // Add this line for debugging
    if (response.status === 200) {
      return response.data.choices[0].message.content;
    } else {
      console.error("Error in generateChatCompletion:", response);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error calling createChatCompletion:", error);
  }
}

async function generateTranslation(
  messages,
  model = "gpt-3.5-turbo",
  temperature = 1,
  maxTokens = null
) {
  const data = {
    model,
    messages,
    temperature,
  };

  if (maxTokens !== null) {
    data.max_tokens = maxTokens;
  }
  console.log("Generating chat completion"); // Add this line for debugging

  try {
    const response = await openai.createChatCompletion(data);
    console.log("Chat completion response ok"); // Add this line for debugging

    if (response.status === 200) {
      return response.data.choices[0].message.content;
    } else {
      console.error("Error in generateChatCompletion:", response);

      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error calling createTranslation:", error);
  }
}

exports.generateTranslation = generateTranslation;
