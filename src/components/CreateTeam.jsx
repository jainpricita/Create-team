import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import SideNavBar from './Sidenav'
import "../App.scss"
export default function CreateTeam({dataList}) {
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!isShow)
  }
  return (
    <>
      <Button variant="success" onClick={initModal}>
        Create Team +
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Create A Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SideNavBar dataList={dataList}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={initModal}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}