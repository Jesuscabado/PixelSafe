import projectModel from "../../models/projectModel.js";

const getAll = async()=> {
    try {
        const projects = await projectModel.find();
        return projects;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const project = await projectModel.findById(id);
        return project;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const create = async(data) =>{
    try {
        const project = await projectModel.create(data);
        return project;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const project = await projectModel.findByIdAndUpdate(id,data);
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const project = await projectModel.findByIdAndDelete(id);
        return project;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const addUser = async(projectId,userId) =>{
    try {
        const project = await getById(projectId);
        if(!project.users.includes(userId)){
            project.users.push(userId);
            await project.save();
            return project
        }
        return project;
    } catch (error) {
        return null;
    }
}
const removeUser = async(projectId,userId)=>{
    try {
        const project = await getById(projectId);
        if(project.users.includes(userId)){
            project.users = project.users.filter(u=> u!==userId);
            await project.save();
            return project
        }
        return project;
    } catch (error) {
        return null;
    }
}
export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
    addUser,
    removeUser,
}

export default functions;