import React, {  Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
class RetailerDetail extends Component{
  constructor(props) {
    super(props);
    this.unsubscribe = null
    this.state = {
      user: {},
      key: '',
      gst1:[],
      packages:[],
      key1:'',
      keyPack:''
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    console.log("into given packages")
    const packages = [];
    querySnapshot.forEach((doc) => {
    
      packages.push({
        keyPack: doc.id,
        doc// DocumentSnapshot
        } 
        );
      });
    this.setState({
      packages : packages
   });
   console.log("packages array" , packages)
   }

  componentDidMount() {
   
    const ref = firebase.firestore().collection('retailersList').doc(this.props.match.params.id);
    ref.get().then((doc) => {
   
      const gst1 = [];
      
      const data = doc.data().gstInfo;
      if (data){
      gst1.push({
        tradeNam:data.tradeNam,
        lgnm: data.lgnm,
        addr: data.addr,
        ctb:data.ctb ,
        lstupdt:data.lstupdt ,
        sts:data.sts
      });
    }
      this.setState({
        user: doc.data(),
        key: doc.id,
       key1 : doc.data().userId
      ,gst1 :gst1       
      }, ()=>{});        
      

      const ref1 = firebase.firestore().collection('users').doc(this.state.key1)
      .collection('retailers').doc(this.props.match.params.id)
      .collection('givenpackages')
      console.log(this.state.key,this.state.key1)
      if(ref1.onSnapshot){
      ref1.onSnapshot(this.onCollectionUpdate)
    }else {
      console.log("somthing went wrong")
    }

      });
         
  }

  delete(id){
    firebase.firestore().collection('retailersList').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/retailers")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
    
  }

render(){
return (

  <div className="row">
  <div className="col s12 m6">
  <br/>



  <div class="card text-center" styles="width: 18rem;">
      <br/>
<center>  {this.state.user.profileUrl ? <img src={this.state.user.profileUrl} alt="..." class="rounded" height="170px" width="170px"/> : "No picture"}
     </center>
  <div class="card-body">
  <h5 class="card-title">{this.state.user.name} </h5>
  <p class="card-text"><small class="text-muted">{this.state.user.email}</small></p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">User Id :{this.state.key1}</li>
    
    <li class="list-group-item">{this.state.user.phone}</li>
    <li class="list-group-item">{this.state.user.address}</li>
    <li class="list-group-item">{this.state.user.location ? this.state.user.location : "Not Available"}</li>
  </ul>
  <div class="card-body">
  <button onClick={this.props.history.goBack} class="btn btn-secondary">Back</button> &nbsp;&nbsp;
     <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
  </div>
  
         
</div>


           
       </div>
  <div className="col s12 m5 offset-m1">
  <br/>
  {this.state.user.gst && this.state.user.gst !== "not available" ?<h5> GST NUMBER: {this.state.user.gst}</h5> : null}
<br/>
{ this.state.gst1 

? <table className="table">
          <thead className ="table-striped">
             <tr>
                  <th>Retailer trade Name</th>
                  <th>Retailer Status</th>
                  <th>Retailer address</th>
                
                </tr>
              </thead>
              <tbody>
                {this.state.gst1.map(key =>
                  <tr>
                    <td>{key.tradeNam}</td>
                    <td>{key.sts}</td>
                    <td>{key.addr}</td>
                  </tr>
                )}
              </tbody>
            </table>

:null}
<div>
  <br/>
{ this.state.packages 

? <table className="table">
          <thead className ="table-striped">
             <tr>
                  <th>Package Name</th>
                
                </tr>
              </thead>
              <tbody>
                {this.state.packages.map(key =>
                  <tr>
                    <td>{key.keyPack}</td>
                 
                  </tr>
                )}
              </tbody>
            </table>

:null}
</div>
  </div>

</div>


);
}
}
export default RetailerDetail;
