import azure from 'azure'

export default push()

function push(){
 return{
  universalPush : async function universalPush(obj , msg){
    const notificationHubService = azure.createNotificationHubService('testhub','Endpoint=sb://sanketllfe.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=MyWBdXVgZaSORpuDjzbScxCMiLoYtwd/JRX5hnD6wW4=')
    return new Promise((resolve,reject)=>{

    console.log("This is the obj to which we are sending push")
	console.log(obj,msg)
	//sending to android devices
     let payloadAndroid = {
                data: {
                    message: msg,
					body:"friend"
                }
            }
	notificationHubService.gcm.send(obj, payloadAndroid ,(error)=> {
            if (!error) {
               console.log("Notification sent to android devices.")
               resolve()
                    }
            else {
               console.log("Push notification error Android. Error code 2003.")
			   //console.log(error);
			}
                })
			}).then((resolve,reject)=>{	
     //sending to ios devices
	  let payloadIOS = { 
	               "aps": { 
				        "alert":msg,
						"sound":"default"
						
						} ,
					"acme2":"friend"
					}
					return new Promise((resolve,reject)=>{
     notificationHubService.apns.send(obj, payloadIOS,(error)=> {
            if (!error) {
               console.log("Notification sent to IOS devices")
               resolve()
                }
            else {
               console.log("Push notification error IOS. Error code 2004")
			   }
        }) 
    })   

    })	
  }
 }
}









