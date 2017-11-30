import axios from 'axios'
import {API_HOST_QUERY as QUERY_URL, API_HOST_UPDATE as UPDATE_URL} from '../../../../.env'
import {turnUsernamesToIds, findIdWithUsername} from  './helper_funcs'

export const getRegisterUserQuery = (userId, username, fullName, interests) => {
      let registerQuery = `PREFIX ex: <http://www.example.com/exampleAvatarUserDatabase/>
                            PREFIX map: <http://www.cubrc.org/karmaURI#>
                            PREFIX bfo: <http://purl.obolibrary.org/obo/#>
                            PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
                          PREFIX lro: <http://www.ontologyrepository.com/CommonCoreOntologies/LewisianRelationOntology/>
                        PREFIX owl: <http://www.w3.org/2002/07/owl#>
                        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                        PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>
                        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                        INSERT DATA {
                          map:Person_`+ userId + ` ro:participates_in ex:Reg_`+ userId +`  ;
                              cco:uses ex:Avatar_` + userId + ` ;
                      cco:designated_by ex:AvatarName_`+ userId +` ;
                      cco:designated_by ex:AvatarUsername_`+ userId + ` .
               ex:Reg_` + userId + ` rdf:type cco:RegistrationProcess ;
                              cco:has_output ex:Avatar_`+ userId + ` .
               ex:Avatar_`+ userId + ` rdf:type cco:AvatarAccount ;
                              ro:has_part ex:NameBear_` + userId + ` ;
                              ro:has_part ex:UsernameBear_` + userId + ` .
              ex:NameBear_` + userId + ` rdf:type cco:DesignativeName .
              ex:UsernameBear_` + userId + ` rdf:type cco:Username .
               ex:NameBear_` + userId + ` cco:bearer_of ex:AvatarName_` + userId + ` ;
                              cco:has_text_value \"` + fullName+`\"^^xsd:string .
               ex:AvatarName_` + userId + ` rdf:type cco:DesignativeName .
                ex:UsernameBear_` + userId + ` cco:bearer_of ex:AvatarUsername_` + userId + ` ;
                       cco:has_text_value  \"` + username+`\"^^xsd:string .
                ex:AvatarUsername_` + userId + ` rdf:type cco:Username .
}
`
  return registerQuery;
}


export const getAllUsers = () => {
    var getUsers = `PREFIX ex: <http://www.example.com/exampleAvatarUserDatabase/>
                   PREFIX map: <http://www.cubrc.org/karmaURI#>
                   PREFIX bfo: <http://purl.obolibrary.org/obo/#>
                   PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
                   PREFIX lro: <http://www.ontologyrepository.com/CommonCoreOntologies/LewisianRelationOntology/>
                   PREFIX owl: <http://www.w3.org/2002/07/owl#>
                   PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                   PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                   PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>
                   SELECT ?fullName ?user ?username
                   WHERE {
                     ?user ro:participates_in ?account  ;
                         cco:uses ?AvatarAccount ;
                 cco:designated_by ?nameNode;
                 cco:designated_by ?userNameNode .
          ?nameNode rdf:type cco:DesignativeName .
       ?userNameNode rdf:type cco:Username .
          ?account rdf:type cco:RegistrationProcess ;
                         cco:has_output ?avatar .
          ?avatar rdf:type cco:AvatarAccount ;
                         ro:has_part ?nameBear ;
                         ro:has_part ?userNameBear .
          ?nameBear cco:bearer_of ?avatarName ;
                         cco:has_text_value ?fullName .
          ?avatarName rdf:type cco:DesignativeName .
           ?userNameBear cco:bearer_of ?avatarUserName ;
                  cco:has_text_value  ?username .
           ?avatarUserName rdf:type cco:Username .
                          }`
    console.log(getUsers)
    return getUsers;
}

export const getAddEventQuery = (allUsers, e) => {
  let participants = turnUsernamesToIds(allUsers, e, "participants");
  let organizers = turnUsernamesToIds(allUsers, e, "organizers")
  let participantsQuery = ""
  let count = 0;
  participants.forEach((participant) => {
    if (count == 0) {
        let temp = `ro:has_participants map:` + participant + ` . \n
            map:` + participant + ` rdf:type cco:Person .
        `
        participantsQuery += temp
        count++;
      }  else {
          let temp = `ex:Event_` + e.eventId + ` ro:has_participants map:` + participant + ` . \n
          map:` + participant + ` rdf:type cco:Person .
          `
          participantsQuery += temp;
      }

      })
    let addEventQuery = `PREFIX ex: <http://www.example.com/exampleAvatarUserDatabase/>
                          PREFIX map: <http://www.cubrc.org/karmaURI#>
                          PREFIX bfo: <http://purl.obolibrary.org/obo/#>
                          PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
                        PREFIX lro: <http://www.ontologyrepository.com/CommonCoreOntologies/LewisianRelationOntology/>
                      PREFIX owl: <http://www.w3.org/2002/07/owl#>
                      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                      PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>
                      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                      INSERT DATA {
	     ex:Event_` + e.eventId + ` rdf:type bfo:BFO_0000015 ;
		cco:designated_by ex:EventName_` + e.eventId + ` ;
		cco:described_by ex:EventDesc_` + e.eventId +` ;
		cco:occurs_on ex:Time_` + e.eventId + ` ;
    ro:has_agent map:` + organizers + ` ;
	 ` + participantsQuery + `
		ex:Event_` + e.eventId + ` cco:is_measured_by ex:Cat_` + e.eventId + ` .
  map:` + organizers + ` rdf:type cco:Planner .
	ex:EventName_` + e.eventId + ` rdf:type cco:DesignativeName ;
		cco:inheres_in ex:EventNameBear_` + e.eventId + ` .
	ex:EventNameBear_` + e.eventId + ` rdf:type cco:InformationBearingEntity ;
		cco:has_text_value  \"`+ e.event + `\"^^xsd:string .
	ex:EventDesc_` + e.eventId + ` rdf:type cco:DescriptiveInformationContentEntity ;
 		cco:inheres_in ex:EventDescBear_` + e.eventId +` .
	ex:EventDescBear_` + e.eventId + ` rdf:type cco:InformationBearingEntity ;
 		cco:has_text_value \"` + e.description + `\"^^xsd:string .
	ex:Time_` + e.eventId +` rdf:type bfo:BFO_0000038 ;
		cco:interval_started_by ex:Day_1 ;
		cco:interval_finished_by ex:Day_2 .
	ex:Day_1 rdf:type cco:Day ;
		cco:designated_by ex:Day_1_ID .
	ex:Day_1_ID rdf:type cco:CodeIdentifier ;
		cco:inheres_in ex:Day_1_IDBear .
	ex:Day_1_IDBear rdf:type cco:InformationBearingEntity ;
		cco:has_date_value \"` + e.startTime + `\"^^xsd:date .
	ex:Day_2 rdf:type cco:Day ;
		cco:designated_by ex:Day_2_ID .
	ex:Day_2_ID rdf:type cco:CodeIdentifier ;
		cco:inheres_in ex:Day_2_IDBear .
	ex:Day_2_IDBear rdf:type cco:InformationBearingEntity ;
		cco:has_date_value \"` + e.endTime+`\"^^xsd:date .
	ex:Cat_` + e.eventId + ` rdf:type cco:NominalMeasurementInformationContentEntity ;
		cco:inheres_in ex:CatBear_1 .
	ex:CatBear_1 rdf:type cco:InformationBearingEntity ;
		cco:has_text_value \"` + e.interests.join()+`\"^^xsd:string  .
}`
console.log(addEventQuery)

return addEventQuery;
}

export const getSelectEvent = (userId) => {
    let selectQuery = `PREFIX ex: <http://www.example.com/exampleAvatarUserDatabase/>
                          PREFIX map: <http://www.cubrc.org/karmaURI#>
                          PREFIX bfo: <http://purl.obolibrary.org/obo/#>
                          PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
                        PREFIX lro: <http://www.ontologyrepository.com/CommonCoreOntologies/LewisianRelationOntology/>
                      PREFIX owl: <http://www.w3.org/2002/07/owl#>
                      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                      PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>
                      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                      SELECT ?event ?eventNode ?description ?startTime ?endTime ?organizers ?interests{
	     ?eventNode rdf:type bfo:BFO_0000015 ;
		cco:designated_by ?eventName ;
		cco:described_by ?eventDescr ;
		cco:occurs_on ?time ;
    ro:has_agent ?organizers ;
	 ro:has_participants map:` + userId + ` ;
		cco:is_measured_by ?cat .
    ?organizers rdf:type cco:Planner .
    map:` + userId + ` rdf:type cco:Person .
  ?eventName rdf:type cco:DesignativeName ;
		cco:inheres_in ?eventNameBear .
	?eventNameBear rdf:type cco:InformationBearingEntity ;
		cco:has_text_value ?event .
	?eventDescr rdf:type cco:DescriptiveInformationContentEntity ;
 		cco:inheres_in ?eventDescrBear .
	?eventDescrBear rdf:type cco:InformationBearingEntity ;
 		cco:has_text_value ?description .
	?time rdf:type bfo:BFO_0000038 ;
		cco:interval_started_by ?day1 ;
		cco:interval_finished_by ?day2 .
	?day1 rdf:type cco:Day ;
		cco:designated_by ?day1ID .
	?day1ID rdf:type cco:CodeIdentifier ;
		cco:inheres_in ?day1IDBear .
	?day1IDBear rdf:type cco:InformationBearingEntity ;
		cco:has_date_value ?startTime .
	?day2 rdf:type cco:Day ;
		cco:designated_by ?day2ID.
	?day2ID rdf:type cco:CodeIdentifier ;
		cco:inheres_in ?day2IDBear .
	?day2IDBear rdf:type cco:InformationBearingEntity ;
		cco:has_date_value ?endTime .
	?cat rdf:type cco:NominalMeasurementInformationContentEntity ;
		cco:inheres_in ?catBear .
	?catBear rdf:type cco:InformationBearingEntity ;
		cco:has_text_value ?interests  .
}`
      return selectQuery
}

export const getDeleteEvent = (e, allUsers) => {
  let organizers = turnUsernamesToIds(allUsers, e, "organizers")
  let participantsQuery = ""
  e.participants.forEach((participant) => {
    let part = findIdWithUsername(allUsers, participant)
    let temp = `ro:has_participants map:` + part + ` . \n
        map:` + part + ` rdf:type cco:Person .
    `
    participantsQuery += temp
    })
    let deleteEventQuery = `PREFIX ex: <http://www.example.com/exampleAvatarUserDatabase/>
                          PREFIX map: <http://www.cubrc.org/karmaURI#>
                          PREFIX bfo: <http://purl.obolibrary.org/obo/#>
                          PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
                        PREFIX lro: <http://www.ontologyrepository.com/CommonCoreOntologies/LewisianRelationOntology/>
                      PREFIX owl: <http://www.w3.org/2002/07/owl#>
                      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                      PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>
                      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                      DELETE DATA {
       ex:Event_` + e.eventId + ` rdf:type bfo:BFO_0000015 ;
    cco:designated_by ex:EventName_`+e.eventId + ` ;
    cco:described_by ex:EventDesc_` + e.eventId +` ;
    cco:occurs_on ex:Time_` + e.eventId +` ;
    ro:has_agent map:` + organizers + ` ;
   ` + participantsQuery + `
    ex:Event_` + e.eventId + ` cco:is_measured_by ex:Cat_1 .
  ex:EventName_` + e.eventId + ` rdf:type cco:DesignativeName ;
    cco:inheres_in ex:EventNameBear_`+ e.eventId +` .
  ex:EventNameBear_`+ e.eventId +` rdf:type cco:InformationBearingEntity ;
    cco:has_text_value \"` + e.event + `\" .
  ex:EventDesc_` + e.eventId + ` rdf:type cco:DescriptiveInformationContentEntity ;
    cco:inheres_in ex:EventDescBear_` + e.eventId + ` .
  ex:EventDescBear_` + e.eventId + ` rdf:type cco:InformationBearingEntity ;
    cco:has_text_value \"` + e.description + `\" .
  ex:Time_` + e.eventId + ` rdf:type bfo:BFO_0000038 ;
    cco:interval_started_by ex:Day_1 ;
    cco:interval_finished_by ex:Day_2 .
  ex:Day_1 rdf:type cco:Day ;
    cco:designated_by ex:Day_1_ID .
  ex:Day_1_ID rdf:type cco:CodeIdentifier ;
    cco:inheres_in ex:Day_1_IDBear .
  ex:Day_1_IDBear rdf:type cco:InformationBearingEntity ;
    cco:has_date_value \"` + e.startTime + `\"^^xsd:date .
  ex:Day_2 rdf:type cco:Day ;
    cco:designated_by ex:Day_2_ID .
  ex:Day_2_ID rdf:type cco:CodeIdentifier ;
    cco:inheres_in ex:Day_2_IDBear .
  ex:Day_2_IDBear rdf:type cco:InformationBearingEntity ;
    cco:has_date_value \"` + e.endTime+`\"^^xsd:date .
  ex:Cat_1 rdf:type cco:NominalMeasurementInformationContentEntity ;
    cco:inheres_in ex:CatBear_1 .
  ex:CatBear_1 rdf:type cco:InformationBearingEntity ;
    cco:has_text_value \"` + e.interests.join()+`\"^^xsd:string  .
}`
  return deleteEventQuery;
}
