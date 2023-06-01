
function toggleNav() {
    const navLinks = document.querySelector('.nav-links');
    const rightItems = document.querySelector('.right-items');
    const burger = document.querySelector('.burger');

    navLinks.classList.toggle('show');
    rightItems.classList.toggle('show');

    if (navLinks.classList.contains('show')) {
      burger.classList.add('open');
    } else {
      burger.classList.remove('open');
    }
  }


function toggleSearchBox() {
    const searchBox = document.getElementById('search-box');
    searchBox.classList.toggle('show');
  }

  function filterBlogPosts() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();
    const allPostElements = document.querySelectorAll('.post');

    allPostElements.forEach((postElement) => {
      const titleElement = postElement.querySelector('h2');
      const contentElement = postElement.querySelector('div');

      const titleMatch = titleElement.textContent.toLowerCase().includes(searchTerm);
      const contentMatch = contentElement.textContent.toLowerCase().includes(searchTerm);

      if (titleMatch || contentMatch) {
        postElement.style.display = 'block';
      } else {
        postElement.style.display = 'none';
      }
    });
  }

  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    filterBlogPosts();
  });



     const seeMoreButton = document.getElementById('see-more');
    const seeLessButton = document.getElementById('see-less');
    const blogPosts = document.getElementById('blog-posts');

seeMoreButton.addEventListener('click', () => {
  blogPosts.classList.remove('effect');
});

seeLessButton.addEventListener('click', () => {
  blogPosts.classList.add('effect');
});





  document.addEventListener("DOMContentLoaded", function() {
    var blogPostsElement = document.getElementById("blog-posts");
    var seeMoreButton = document.getElementById("see-more");
    var seeLessButton = document.getElementById("see-less");
    var allPosts = [];
    var displayCount = 3;

    function displayBlogPosts(posts) {
      blogPostsElement.innerHTML = "";

      posts.forEach(function(post, index) {
        var postElement = createPostElement(post);
        blogPostsElement.appendChild(postElement);

        if (index >= displayCount) {
          postElement.style.display = "none";
        }
      });

      if (posts.length > displayCount) {
        seeMoreButton.style.display = "block";
      } else {
        seeMoreButton.style.display = "none";
      }

      seeLessButton.style.display = "none";
    }

    function createPostElement(post) {
        var postElement = document.createElement("div");
        postElement.classList.add("post");

        var imageElement = document.createElement("img");
        imageElement.src = "./Image/ReadMore.png";
        imageElement.alt = post.title.rendered;

        var titleElement = document.createElement("h2");
        titleElement.textContent = post.title.rendered;

        var contentElement = document.createElement("div");
        contentElement.innerHTML = post.content.rendered;

        postElement.appendChild(imageElement);
        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);

        return postElement;
      }


    function fetchBlogPosts() {
      fetch("http://salmankhoolia.local/wp-json/wp/v2/posts")
        .then(function(response) {
          return response.json();
        })
        .then(function(posts) {
          allPosts = posts;
          displayBlogPosts(allPosts);
        })
        .catch(function(error) {
          console.log("Error fetching blog posts:", error);
        });
    }

    seeMoreButton.addEventListener("click", function() {
      displayCount = allPosts.length;
      displayBlogPosts(allPosts);

      seeMoreButton.style.display = "none";
      seeLessButton.style.display = "block";
    });

    seeLessButton.addEventListener("click", function() {
      displayCount = 3;
      displayBlogPosts(allPosts);

      seeMoreButton.style.display = "block";
      seeLessButton.style.display = "none";
    });

    fetchBlogPosts();
  });
