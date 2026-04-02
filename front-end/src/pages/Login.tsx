import { isEmail } from "../utils/isEmail";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if(!sEmail(email)){
            alert('Email is invalid');
            return
        }

        if(password.length < 6){
            alert('Password must be at least 6 characters');
            return
        }

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if(!response.ok){
            const data = await response.json()
            alert('Login error : ' + data);
            return
        }
    };

    return (
        <div></div>
    )
}

export default Login;