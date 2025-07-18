import { faker } from "@faker-js/faker";
import { Post } from "../module/post/entities/post.entity";
import { setSeederFactory } from "typeorm-extension";

export const PostFactory =setSeederFactory(Post,async()=>{
    const post = new Post()
    post.title = faker.lorem.sentence(2)
    post.content = faker.lorem.paragraph(30)
    return post;
})