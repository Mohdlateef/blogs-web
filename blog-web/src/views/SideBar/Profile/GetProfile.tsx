import profileQurey from "../../../apiServices/profile/profileQurey";


const GetProfile=()=>{
const{data}:any=profileQurey.useQueryGetprofile();
console.log(data);
return(
    data?
   
    <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg  ">
    <span className="text-xl font-semibold text-gray-800">Name: <span className="font-normal text-gray-600">{data.name}</span></span>
    <span className="text-xl font-semibold text-gray-800">Username: <span className="font-normal text-gray-600">{data.username}</span></span>
    <span className="text-xl font-semibold text-gray-800">Email: <span className="font-normal text-gray-600">{data.email}</span></span>
  </div>:""
)

}



export default GetProfile;