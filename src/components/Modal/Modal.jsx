import React from 'react';
import './Modal.css';

function Modal({ winner, onClose }) {
	return (
		<div className="modal">
			<div className="modal-content">
				<h2>Winner: {winner}</h2>
				<button className='close' onClick={onClose}>Close</button>
			</div>
		</div>
	);
}

export default Modal;
