import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List, ListItem } from 'semantic-ui-react';


interface Activity {
   id:any,
   title:string
}

function App() {

  const [Activties, setActivties] = useState([]);

  useEffect(() => {
   axios.get("http://localhost:5000/api/Activities").then((response)=>{
    console.log(response);
   setActivties(response.data);
  }
   )
  }, []);

  return (
    <div>
        <Header as="h2" icon="users" content ="Reactivities" />
        <List>
          {Activties.map( (activity :Activity) =>
            <ListItem key={activity.id} >{activity.title}</ListItem>
          )}
       </List>
        
     
    </div>
  );
}

export default App;
