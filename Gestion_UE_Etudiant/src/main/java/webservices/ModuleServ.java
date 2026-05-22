package webservices;

import entities.Module;
import entities.UniteEnseignement;
import metiers.ModuleBusiness;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/Module")
public class ModuleServ {
    static ModuleBusiness moduleBusiness = new ModuleBusiness();




    //get all the modules
    @Path("/list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getModules(){
        return Response.status(200).entity(moduleBusiness.getAllModules()).build();
    }


    //get module by matricule
    @Path("/list/{matricule}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getModulesByMat(@PathParam("matricule") String matricule){
        return Response.status(200).entity(moduleBusiness.getModuleByMatricule(matricule)).build();
    }


    //delete module by matricule
    @Path("/list/{matricule}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public Response DELETEModulesByMat(@PathParam("matricule") String matricule){
        moduleBusiness.deleteModule(matricule);
        return Response.status(200).entity("Module deleted Successfully").build();
    }



    //add new module
    @Path("/add")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response addModule(Module module) {
        moduleBusiness.addModule(module);
        return Response
                .status(Response.Status.CREATED)
                .entity("Successfully operation")
                .build();
    }


    @Path("/update/{matricule}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response updateModule(Module module , @PathParam("matricule") String matricule) {
        moduleBusiness.updateModule(matricule,module);
        return Response
                .status(Response.Status.OK)
                .entity("Successfully operation")
                .build();
    }


    @Path("/listByUE")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getModuleByUE(UniteEnseignement ue){
        return Response.status(200).entity(moduleBusiness.getModulesByUE(ue)).build();
    }
}
