import { PostPatch } from "../json/patch/PostPatch";
import { Types } from "mongoose";
import { Forum } from "../entities/Forum";
import { Post } from "../entities/Post";
import { JsonBadReqError, JsonNotFoundError } from "../json/JsonError";
import { JsonForum } from "../json/JsonForum";
import { JsonPost, JsonPostCreation } from "../json/JsonPost";
import * as AdminService from './admin-service'

export const createPost = async (postCreation: JsonPostCreation, userId: string): Promise<JsonPost> => {
    if (await validatePostCreation(postCreation)) {
        const created = await Post.insertMany([
            {
                date: new Date().toISOString(),
                forumId: postCreation.forumId,
                text: postCreation.text,
                userId: userId
            }
        ])
        return created[0] as JsonPost
    }
    throw new JsonBadReqError(`Can't create post for creation ${JSON.stringify(postCreation)}`)
}

const validatePostCreation = async (postCreation: JsonPostCreation) => {
    if (!postCreation.text) throw new JsonBadReqError(`'text' field is undefined or null`)
    if (postCreation.text === '') throw new JsonBadReqError(`Cannot create an empty post. Please provide a valid 'text' field`)
    if (await Forum.exists({ _id: postCreation.forumId }))
        return true
    throw new JsonNotFoundError(`Can't create post for forum ${postCreation.forumId} because it doesn't exists`)
}

export const checkPostAccess = async (userId: string, postId: string): Promise<boolean> => {
    const isOwner = userId === (await Post.findById(postId))?.userId
    const isAdmin = await AdminService.isAdmin(userId)
    return isOwner || isAdmin
}

export const deletePost = async (postId: string): Promise<JsonPost> => {
    const post = await Post.findById(postId)
    if (!post) {
        throw new JsonNotFoundError(`Can't find post with id ${postId}`)
    }
    post.valid = false
    await post.save()
    return post as JsonPost
}

export const getForums = (): Promise<JsonForum[]> =>
    Forum.find({}).then(x => x.map(y => y as JsonForum))

export const getPostOfForum = async (forumId: string, showInvalid = false): Promise<JsonPost[]> => {
    let id: Types.ObjectId
    try { 
        id = new Types.ObjectId(forumId) 
    } catch(err) {
        throw new JsonBadReqError(`Value ${forumId} for field 'id' is invalid`)
    }
    if (await Forum.exists({ _id: id})) {
        return (await Post.find({ forumId: forumId })).filter(x => showInvalid || x.valid) as JsonPost[]
    }
    throw new JsonNotFoundError(`Can't find forum with id ${forumId}`)
}

export const getForum = async (forumId: string): Promise<JsonForum> => {
    const forum = await Forum.findById(forumId)
    if (!forum) 
        throw new JsonNotFoundError(`Can't find forum with id ${forumId}`)
    return forum
}

export const patchPost = async (postId: string, postPatch: PostPatch): Promise<JsonPost> => {
    const post = await Post.findById(postId)
    if (!post)
        throw new JsonNotFoundError(`Post with id '${postId}' not found`)

    // Not the best solution but it works and we have no time
    if (postPatch.likes)
        post.likes = postPatch.likes

    await post.save()

    return post
}