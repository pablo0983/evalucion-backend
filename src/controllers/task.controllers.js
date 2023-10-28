const { response } = require("express")
const { Task } = require("../models/db");

const createTask = async (req, res) => {
    try {

        const newTask = await Task.create(req.body);

        return res.status(201).json({
            ok: true,
            msg: 'Ha creado una tarea',
            data: newTask
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
            error
        })
    }
};

const getTask = async (req, res) => {
    try{

        const tasks = await Task.findAll();

        return res.status(200).json({
            ok: true,
            msg: 'Tarea recibida',
            data: tasks
        });


    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
            error
        })
    }
};

const updateTask = async (req, res) => {

    try {
        
        const { id } = req.params;

        const updatedTask = await Task.update(req.body, {
            where: {id}
        });

        if(!updatedTask){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró la tarea'
            })
        }

        if(updatedTask[0] === 0){
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo actualizar la tarea'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'La tarea fue actualizada correctamente',
            data: updatedTask
        })


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
            error
        });
    }

};

const deleteTask = async (req, res) => {
    try {

        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                ok: false,
                msg: 'Por favor ingrese un id correcto'
            })
        }

        const task = await Task.destroy({
            where:{id}
        });

        if(!task){
            return res.status(404).json({
                ok: false,
                msg: 'No fue posible encontrar la tarea'
            })
        }

        return res.status(200).json({
            ok: true,
            msg: 'La tarea fue eliminada correctamente',
            data: task
        })

        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
            error
        })
    }
};

module.exports ={
    createTask,
    deleteTask,
    getTask,
    updateTask
};



