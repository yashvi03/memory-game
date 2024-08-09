import '../styles/Styles.css';
import LostImage from '../assets/lost.jpg';
import WinImage from '../assets/win.jpg';

function Modal({ result, closeModal }) {
  const imageSrc = result === "You Win" ? WinImage : LostImage;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ backgroundImage: `url(${imageSrc})` }}>
        <h2 className="modal-text">{result}</h2>
        <button onClick={closeModal} className="close-button">Close</button>
      </div>
    </div>
  );
}

export default Modal;
