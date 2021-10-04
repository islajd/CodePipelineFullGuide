const handler = async (event) => {
  let a = event.body.a || 67
  let b = event.body.b || 813
  return{
    statusCode: 200,
    body: (a+b)
  }
}

module.exports = { 
  handler
}