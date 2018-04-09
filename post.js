
module.exports =(worker) => {
    class Post {
        constructor() {
            
            console.log(worker.id);
        }
    }
    return new Post(worker);
};