# APIs and useEffect

github rest api:

https://docs.github.com/en/rest

kanye rest:

https://kanye.rest/

padStart:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart

iife:

https://developer.mozilla.org/en-US/docs/Glossary/IIFE

notes:

https://gawdiseattle.gitbook.io/wdi/16-react/react-apis/fetch-apis

lab:

https://github.com/WDI-SEA/react-ajax-lab-ancross

## Code

```jsx
import React, {
  useState,
  useEffect
} from 'react'

export default function Kayne() {
  const [wisdom, setWisdom] = useState('')

  useEffect(() => {
    // fetch kanye's wisdom from the API
    fetch('https://api.kanye.rest/')
      .then(response => response.json())
      .then(kanyeData => {
        // store wisdom in app state after the kayne as a service responds
        setWisdom(kanyeData.quote)
        console.log(kanyeData)
      })
      .catch(err => console.log(err))
    }, [])
    
    
    const handleBestowWisdow = () => {
      fetch('https://api.kanye.rest/')
        .then(response => response.json())
        .then(kanyeData => {
          setWisdom(kanyeData.quote)
          console.log(kanyeData)
        })
        .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>{wisdom}</h1>
      <button
        onClick={handleBestowWisdow}
      >
        Bestow Wisdom Upon Me
      </button>
    </div>
  )
}
```

```jsx
import React, { 
  useState, 
  useEffect 
} from 'react'

import axios from 'axios'

const Form = () => {
  const [search, setSearch] = useState('weston-bailey')
  const [repos, setRepos] = useState([])

  // this only runs once
  useEffect(() => {
    // its bad form to async a useEffect's callback 
    (async function fetchRepos() {
      try {
        // interpolate search into github api url
        const url = `http://api.github.com/users/${search}/repos`
        // axios call the API
        const response = await axios.get(url)
        // set state conditionally based on response status
        if(response.status === 200) {
          console.log(response.data)
          setRepos(response.data)
        }
      } catch(err) {
        console.log(err)
      }
    })() // IIFE async function
  }, [search])

  // map the user's repos to a div
  const divs = repos.map((repo, idx) => <div key={idx}>{repo.name}</div>)
  return (
    <div>
      <form>
        <input 
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>

      {divs}
    </div>
  )
}

export default Form
```

```jsx
// in KeyPress.jsx
import {
  useEffect,
  useState
} from 'react'

export default function KeyPress() {
  const [pressedKey, setPressedKey] = useState('')

  const keyDownHandler = e => setPressedKey(e.key)

  useEffect(() => {
    // add event listeners
    window.addEventListener('keydown', keyDownHandler)
    // remove event listeners
    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <div>
      <p>the pressed key is: {pressedKey}</p>
    </div>
  )
}
```

```jsx
import React, { 
  useState, 
  useEffect 
} from 'react'

const Timer = () => {
    const [seconds, setSeconds] = useState(0)

    // useEffect can be used as: componentDidMount, componentDidUpdate, 
    // and componentWillUnmount all in one!
    
    // like a componentDidUpdate.. but it ONLY runs when the seconds changes
    useEffect(() => {
        const incrementTime = () => { 
            setSeconds(seconds + 1) 
        }
        const interval = setInterval(incrementTime, 1000)
        // this setInterval has a "side effect" that isn't being cleaned up

        // componentWillUnmount equivalent
        return () => {
            clearInterval(interval)
        }
    }, [seconds])

    useEffect(() => {
        // componentDidUpdate equivalent
        // With no dependency array - the useEffect gets called on component mount
        // And every time the state changes (aka updates)
        console.log('The useEffect has been called!')
    })

    useEffect(() => {
        // componentDidMount equivalent
        console.log('This runs only once!')
    }, [])

    let sec = (seconds % 60).toString().padStart(2, '0')
    let min = Math.floor(seconds/60)
    return (
        <div>
            <p>{min}:{sec}</p>
            <button onClick={() => setSeconds(seconds + 1)}>Click me!</button>
        </div>
    )
}

export default Timer

// componentDidMount
// componentDidUpdate
// componentWillUnmount

// import { Component } from 'react'
// class Timer extends Component {
//     constructor() {
//         super()
//         this.state = {
//             seconds: 0,
                // interval: null
//         }
//     }
    // const updateSeconds = () => {
    //     this.setState({
    //         seconds: seconds + 1
    //     })
    // }
    // setInterval()
    // clearInterval()
//     render() {
//         return <div>This is a class based timer!</div>
//     }
// }
```

###### tags: `lessons`
