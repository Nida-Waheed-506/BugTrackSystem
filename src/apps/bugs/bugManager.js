const { createBug } = require("./bugController");
const { getAllBugsOfProject } = require("./bugController")
const { statusChange } = require("./bugController");

const createBugFun = async (req, res, next) => {

    try {

        const { project_id } = req.params;

        const { id: QA_id } = req.user;



        const bug = await createBug(project_id, QA_id.toString(), req?.file?.buffer, req.body);
        if (bug) res.json({ message: "Bug is created", data: bug });



    } catch (error) {



        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                error: "Bug with this title already exists."
            })
        }

        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                error: error.errors[0].message === "invalid date" ? error.errors[0].message : "Title , type , status must be filled"
            })
        }



        if (error instanceof Error) {
            return res.status(400).json({ error: error.message});
        }

        return res.status(500).json({ error: "Unexpected error" });
    }
}



const getAllBugsOfProjectFunc = async (req, res, next) => {

    try {

        const { project_id } = req.params;





        const bugs = await getAllBugsOfProject(project_id);

        if (bugs.length !== 0) res.json({ message: "Feature & Bugs of this project : ", data: bugs });
        else throw new Error("This project has no feature or bugs to list")


    } catch (error) {




        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Unexpected error" });
    }

}


const statusChangeFunc = async (req, res, next) => {


    try {

        const { bug_id: id } = req.params;
        const { status } = req.body;




        const bug = await statusChange(id, status);

        if (bug.length !== 0) res.json({ message: "Status of change successfully", data: bug });
        else throw new Error("Status does not change")


    } catch (error) {




        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "Unexpected error" });
    }

}

module.exports = { createBugFun, getAllBugsOfProjectFunc, getAllBugsOfProject, statusChangeFunc }