export interface User{
  firstName: string,
  lastName:string,
  email:string,
  password:string,
  photo:string,
  isWorker:boolean,
  skill,
}

export interface SystemUser{
  Surname: string,
  email:string,
  FirstName: string,
}

export interface Worker{
  name?: string,
  profession?: string,
  location?: string,
  phonenumber?: string,
  email?:string,
  gender?:string,
  workerImages,
  ratings?:Number
}

export interface project{
  name:string,
  description:string,
  tasks:number,
  workers:number,
  color:string,
  projectProgress:string,
}

export interface Card{
  issuedby:string,
  assignedto:string,
  task: string,
  img:string
}

export interface Task{
  taskname:string
  task:Card[];
}
