import React, {
  useState,
  useEffect
} from 'react'

const Kanye = () => {
  // hold kayne's qoute in state
  const [wisdom, setWisdom] = useState('')

  // fetch a quote from the API 
  useEffect(() => {
    // hit the API endpoint
    fetch('https://api.kanye.rest/')
      .then(response => response.json())
      .then(kanyeData => {
        // set state to the qoute
        setWisdom(kanyeData.quote)
        console.log(kanyeData.quote)
      })
      .catch(err => console.log(err))
  }, [])
  
  const handleBestowWisdom = () => {
    // hit the API endpoint
    fetch('https://api.kanye.rest/')
      .then(response => response.json())
      .then(kanyeData => {
        // set state to the qoute
        setWisdom(kanyeData.quote)
        console.log(kanyeData.quote)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <button
      onClick={handleBestowWisdom}
      >
        bestow upon me some wisdom
      </button>

      <h1>{wisdom}</h1>
    </div>
  )
}

export default Kanye