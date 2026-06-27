
export const generateResponse = async (prompt) =>{
  try{
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` ,
    'Content-Type': 'application/json',
  },

  body: JSON.stringify({
    model: 'deepseek/deepseek-chat',
    messages: [
        {
            role: 'system' ,
            content: 'You must return only valid raw json'
        },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature:0.2,
    max_tokens: 8000 //Stops DeepSeek from hanging infinitely
    
  })
})

if(!res.ok){
    const errText = await res.text()
    console.error("OpenRouter API Error response:", errText)
    throw new Error("openrouter err: " + errText)
}

const data = await res.json()
if(data.choices && data.choices[0]?.message?.content) {
  return data.choices[0].message.content
}
throw new Error("AI returned an empty response layout choices block")

  }catch (error)
  {
    console.error("Error inside generateResponse helper:" , error.message)
      throw error

    } 
  

  }


 
