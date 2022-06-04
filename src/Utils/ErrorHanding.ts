export function ErrorHanding(data: { UserName:string, Pass:string, Pass_repeat:string }){
    console.log(data.UserName+ " " + data.Pass + " "+ data.Pass_repeat);
}