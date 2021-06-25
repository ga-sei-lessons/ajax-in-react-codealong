import React, {
  useState,
  useEffect
} from "react"
import axios from "axios"

const Github = () => {
  const [search, setSearch] = useState('weston-bailey')
  const [repos, setRepos] = useState([])

  useEffect(() => {
    async function fetchRepos() {
      try {
        const url = `http://api.github.com/users/${search}/repos`
        const response = await axios.get(url)
        console.log(response.data)
        setRepos(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchRepos()
  }, [search])

  const renderedRepos = repos.map((repo, index) => <li key={index}>{repo.name}</li>)

  return (
    <div>
      <form>
        <label for="search">Search for a user:</label>

        <input
          type="text"
          id="search"
          onChange={e => setSearch(e.target.value)}
        />
      </form>

      <ul>
        {renderedRepos}
      </ul>
    </div>
  )
}

export default Github