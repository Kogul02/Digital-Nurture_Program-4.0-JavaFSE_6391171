import React from 'react';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hasError: false,
      errorMessage: ''
    };
    this.loadPosts = this.loadPosts.bind(this);
  }

  // Method to fetch posts from API and set the state
  loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        this.setState({ posts: data, hasError: false, errorMessage: '' });
      })
      .catch(error => {
        this.setState({ hasError: true, errorMessage: error.message });
        alert('Error fetching posts: ' + error.message);
      });
  }

  // Lifecycle hook: runs after component mounts
  componentDidMount() {
    this.loadPosts();
  }

  // Lifecycle hook: catches errors in any child components
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    alert(`An error occurred: ${error.toString()}`);
    // Optionally, log error and info to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return <h2>Oops! Something went wrong while loading posts.</h2>;
    }

    return (
      <div>
        <h1>Posts</h1>
        {this.state.posts.map(post => (
          <div key={post.id} style={{border: '1px solid #ccc', marginBottom: '10px', padding: '10px'}}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Posts;
