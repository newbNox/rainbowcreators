import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import buyCoffee from '../public/bmc-button.png';

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className='row pt-4'>
                    <div className='col'>
                        <ul className="list-group-flush">
                            <li className="list-group-item"><a href="https://github.com/newbNox/rainbowcreators" target="_blank" className='light'><FontAwesomeIcon icon={faGithub} /> Open Source project by newbNox</a></li>
                            <li className="list-group-item"><a href="/discord" target='_blank' className='light'><FontAwesomeIcon icon={faDiscord}/> Discord Community</a></li>
                        </ul>
                    </div>
                    <div className='col text-end'>
                        <ul className='list-group-flush'>
                            <li className='list-group-item'><a href='https://www.buymeacoffee.com/rainbowcreators' target='_blank'><Image src={buyCoffee} className='buyCoffee'/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;