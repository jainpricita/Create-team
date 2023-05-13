
import React, { useState } from 'react';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../App.scss"
import SideNav, {
  NavItem,
  NavText
} from "@trendmicro/react-sidenav";

export default function SideNavBar({ dataList }) {
  const [domainFilter, setDomainFilter] = useState("IT");
  const [showData, setShowData] = useState(false);
  const [userSelected, setUserSelected] = useState("");
  const [selectedUserList, setSelectedUserList] = useState([]);

  let filteredData = dataList.filter(user => user.domain === domainFilter && user.available);

  function handleDomainChange(event) {
    setDomainFilter(event.target.innerText);
    setShowData(true);
  }

  function handleSelectedUser(event) {
    setUserSelected(event.target.innerText);
    // console.log(event);
    // userPushed = filteredData.filter(user => user.id === userSelected);
    console.log(userSelected)
    setSelectedUserList([...selectedUserList, userSelected])
    // arrayU.push(userSelected);
    setShowData(false);
  }


  const domains = [...new Set(dataList.map(user => user.domain))];

  return (
    <SideNav expanded={true} className="sideNav-modal">
      <SideNav.Nav>

        {showData && (
          <div class="card" style={{ width: 18 + "rem", backgroundColor: "lightgray", height: 100 + "%", zIndex: 2, position: "absolute", overflowY: "scroll", left: 100 + "%", paddingLeft: 1 + "em" }}>
            <ul class="list-group">
              {filteredData.map(data => (
                <li key={data.id} onClick={handleSelectedUser} value={data.id} style={{ marginTop: 1 + "em", fontSize: 1.1 + "em", listStyle: "none", cursor: "pointer" }}>{data.first_name} {data.last_name}</li>
              ))}
            </ul>
          </div>
        )}

        {domains.map(domain => (
          <NavItem key={domain} onClick={handleDomainChange}>
            <NavText style={{ marginTop: .5 + "em", fontSize: 1.4 + "em", paddingLeft: 1 + "em" }}>{domain}</NavText>
          </NavItem>
        ))}
      </SideNav.Nav>
      <div style={{ width: 270 + "%", height: 100 + "%", position: "absolute", overflowY: "scroll", left: 100 + "%", paddingLeft: 1 + "em" }}>
        <table class="table">
          <thead>
    <tr>
      <th scope="col">Name</th>
    </tr>
  </thead>
          <tbody>
            {selectedUserList.map(user => (
              <tr>
                <td>{user}</td>
              </tr>

            ))}


          </tbody>
        </table>
      </div>



    </SideNav>
  );
}

