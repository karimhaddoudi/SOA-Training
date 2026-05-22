package webservices;

import entities.UniteEnseignement;
import metiers.UniteEnseignementBusiness;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/ue")
public class UEser {

    static UniteEnseignementBusiness unitesEnseignement = new UniteEnseignementBusiness();

    @Path("/list")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUE(){
        return Response.status(200).entity(unitesEnseignement.getListeUE()).build();
    }

    //Récupération de la liste des unités d’enseignements d’un semestre spécifique
    @Path("/list/{semestre}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUEBYS(@PathParam("semestre") int semestre){
        return Response.status(200).entity(unitesEnseignement.getUEBySemestre(semestre)).build();
    }



    //Récupération de la liste des unités d’enseignements d’un code spécifique
    @Path("/list/code/{code}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUEBYC(@PathParam("code") int code){
        return Response.status(200).entity(unitesEnseignement.getUEByCode(code)).build();
    }



    @Path("/list/update/{id}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON) // Zid hathi hna zeda!
    @Produces(MediaType.TEXT_PLAIN)
    public Response updateUE(@PathParam("id") int id, UniteEnseignement ue) {
        // Hna zeda badalna l static bech mayضيعch el update
        unitesEnseignement.updateUniteEnseignement(id, ue);
        return Response
                .status(Response.Status.OK)
                .entity("Modification effectuée")
                .build();
    }

    @Path("/add")
    @POST
    @Consumes(MediaType.APPLICATION_JSON) // Zid hathi bech yaqra el JSON mte3 Postman
    @Produces(MediaType.TEXT_PLAIN)
    public Response addUE(UniteEnseignement ue) {
        unitesEnseignement.addUniteEnseignement(ue);
        return Response
                .status(Response.Status.CREATED)
                .entity("operation effectué avec success")
                .build();
    }

    //delete module by matricule
    @Path("/list/{code}")
    @DELETE
    @Produces(MediaType.TEXT_PLAIN)
    public Response DELETEUniteE(@PathParam("code") int code){
        unitesEnseignement.deleteUniteEnseignement(code);
        return Response.status(200).entity("Module deleted Successfully").build();
    }
}
