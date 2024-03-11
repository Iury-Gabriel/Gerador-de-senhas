import { useState } from 'react';
import './App.css';

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleGeneratePassword = () => {
    let charList = '';
    if (includeLowerCase) charList += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpperCase) charList += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charList += '0123456789';
    if (includeSymbols) charList += '!@#$&*()_+~<>';

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += charList.charAt(Math.floor(Math.random() * charList.length));
    }

    setPassword(generatedPassword);
    validatePassword(generatedPassword);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    setIsValidPassword(passwordRegex.test(password));
  };

  const handleCopyPassword = () => {
    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  return (
    <div className='app'>
      <div className='container'>
        <h1>Gerador de senhas</h1>
        <div className={`passwordArea ${isValidPassword ? '' : 'invalidPassword'}`}>
          <p>{password}</p>
        </div>
        <div className="checks">
          <div className="length">
            <input type="range" name="length" id="" min="8" max="50" value={passwordLength} onChange={(e) => setPasswordLength(Number(e.target.value))} />
            <label htmlFor="length">{passwordLength}</label>
          </div>
          <div className="LowerCase">
            <input type="checkbox" name="lowerCase" id="lowerCase" checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)} />
            <label htmlFor="lowerCase">Letras minúsculas</label>
          </div>
          <div className="UpperCase">
            <input type="checkbox" name="upperCase" id="upperCase" checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)} />
            <label htmlFor="upperCase">Letras maiúsculas</label>
          </div>
          <div className="numbers">
            <input type="checkbox" name="numbers" id="numbers" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
            <label htmlFor="numbers">Números</label>
          </div>
          <div className="symbols">
            <input type="checkbox" name="symbols" id="symbols" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
            <label htmlFor="symbols">Simbolos</label>
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleGeneratePassword}>Gerar Senha</button>
          <button onClick={handleCopyPassword}>Copiar Senha</button>
        </div>
      </div>
    </div>
  );
}

export default App;
