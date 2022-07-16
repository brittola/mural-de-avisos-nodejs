module.exports = {
    posts: [],

    getAll() {
        return this.posts;
    },

    newPost(title, description) {
        this.posts.unshift({ id: generateId(), title, description });
    },

    deletePost(id) {
        for (let i in this.posts) {
            if (this.posts[i].id == id) {
                this.posts.splice(i, 1);
                break;
            }
        }
    }
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}