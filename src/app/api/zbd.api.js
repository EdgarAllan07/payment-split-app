

//Send payment to Lightning address
export const SendPayment = async (amount, address, API_KEY) => {
  const response = await fetch("https://api.zebedee.io/v0/ln-address/send-payment", {
    method: "post",
    headers: {
      "apikey": "h0YsMAWwAZ1qP588e7YAOQDehWta5KtY",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "amount": amount,
      "lnAddress": address,
      "comment": "Lightning fast!",
      "internalId": "1b8h1-h1675",
      "callbackUrl": "https://your-domain.com/zbd-callback"
    }
    )
  })
  const data = await response.json()
  return data
}

//Make the charge
export const ChargeQR = async (amount, API_KEY) => {
  const response = await fetch("https://api.zebedee.io/v0/charges", {
    method: "POST",
    headers: {
      "apikey": API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "amount": amount,
      "description": "Test Charge",
      "expiresIn": 300,
      "internalId": "11af01d0",
      "callbackUrl": "https://my-website.com/zbd-callback"
    })
  })


  const data = await response.json();
  return data

}

//Consult if the charge is paid
export const ConsultarQR = async (id, API_KEY) => {
  const response = await fetch(`https://api.zebedee.io/v0/charges/${id}`, {
    method: 'get',
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/json',
      'apikey': 'h0YsMAWwAZ1qP588e7YAOQDehWta5KtY'
    }
  })

  const data = await response.json()
  return data
}

