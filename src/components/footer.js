import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className='row pt-4'>
                    <div className='col'>
                        <ul class="list-group-flush">
                            <li class="list-group-item"><a href="https://github.com/newbNox/rainbowcreators" target="_blank" className='light'><FontAwesomeIcon icon={faGithub} /> Open Source project by newbNox</a></li>
                            <li class="list-group-item"><a href="https://discord.gg/AtsPhp3Wk2" target='_blank' className='light'><FontAwesomeIcon icon={faDiscord}/> Discord Community</a></li>
                        </ul>
                    </div>
                    <div className='col'>
                        
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;