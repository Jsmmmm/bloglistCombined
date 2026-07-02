import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }  

  return ( 
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="title"
            variant="outlined"
            //fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
        </div>

        <div>
          <TextField
            label="Author"
            variant="outlined"
            //fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            margin="normal"
          />
        </div>

        <div>
          <TextField
            label="URL"
            variant="outlined"
            //fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            margin="normal"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm