'use client'

import React, { useState, useRef, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import {
  Unlock,
  Loader2,
  Download,
  Key,
  Search,
  StopCircle,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

// ─── Common Passwords List (1000+) ───────────────────────────────────────────
const COMMON_PASSWORDS: string[] = [
  // Top 100 most common passwords
  '123456', 'password', '12345678', 'qwerty', '123456789', '12345', '1234',
  '111111', '1234567', 'dragon', '123123', 'baseball', 'abc123', 'football',
  'monkey', 'letmein', '696969', 'shadow', 'master', '666666', 'qwertyuiop',
  '123321', 'mustang', '1234567890', 'michael', '654321', 'pussy', 'superman',
  '1qaz2wsx', '7777777', 'fuckyou', '121212', '000000', 'qazwsx', '123qwe',
  'killer', 'trustno1', 'jordan', 'jennifer', 'zxcvbnm', 'asdfgh', 'hunter',
  'buster', 'soccer', 'harley', 'batman', 'andrew', 'tigger', 'sunshine',
  'iloveyou', 'fuckoff', 'charlie', 'robert', 'thomas', 'hockey', 'ranger',
  'daniel', 'starwars', 'klaster', '112233', 'george', 'asshole', 'computer',
  'michelle', 'jessica', 'pepper', '1111', 'zxcvbn', '555555', '11111111',
  '131313', 'freedom', '777777', 'pass', 'fuck', 'maggie', '159753', 'aaaaaa',
  'ginger', 'princess', 'joshua', 'cheese', 'amanda', 'summer', 'love', 'ashley',
  '6969', 'nicole', 'chelsea', 'biteme', 'matthew', 'access', 'yankees',
  '987654321', 'dallas', 'austin', 'thunder', 'taylor', 'matrix',

  // 101-200
  'william', 'corvette', 'hello', 'martin', 'heather', 'secret', 'merlin',
  'diamond', '1234qwer', 'gfhjkm', 'hammer', 'silver', '222222', '888888',
  'anthony', 'justin', 'test', 'test123', 'admin', 'admin123', 'root',
  'welcome', 'welcome1', 'passw0rd', 'password1', 'password123', 'changeme',
  'qwerty123', 'fuckyou1', 'abc1234', 'abcd1234', 'password2', '123abc',
  'training', 'violin', 'america', 'jordan23', 'bullet', 'fishing', 'yamaha',
  'thomas1', 'rangers', 'packers', '1q2w3e4r', 'qwer1234', 'money', 'eagles',
  'hannah', 'carolina', 'bob2686', 'apples', 'orange', 'butterfly', 'purple',
  'angel1', 'jordan1', 'power', 'viking', 'changeme1', 'maverick', 'corona',
  'bigdog', 'johnson', 'player', 'sparky', 'camaro', 'sexy', 'peanut',
  '123abc!', 'whatever', 'richard', 'phoenix', 'aaaa1111', 'qazwsxedc',
  'coffee', 'scooter', 'password!', 'rainbow', 'falcon', 'fucker', 'dick',
  'samantha', 'test1234', 'brandon', 'james', 'matthew1', '12121212', 'lovely',
  '77777777', '88888888', '654321', 'zxcvbn1',

  // 201-300
  'smith', 'steelers', 'joseph', 'snoopy', 'boomer', 'whatever1', 'iceman',
  'gateway', 'dakota', 'cowboys', 'eagle1', 'shithead', 'happy', 'diablo',
  'chicken', 'george1', 'password3', '12341234', 'warrior', 'eagles1',
  'purple1', 'fucker1', 'asdf1234', 'tarheel', '12345a', 'eric', 'banana',
  'lakers', 'victoria', 'magic', '1q2w3e', 'rabbit', 'gentle', 'tigers',
  'cool', 'computer1', 'brown', 'forever', 'rocket', 'david', 'andrea',
  'savannah', 'jackass', 'compaq', 'purple123', 'hardcore', 'river', 'rose',
  'alex', 'alexander', 'mark', 'stephen', 'edward', 'malibu', 'beavis',
  'winter', 'guitar', 'joshua1', 'butthead', 'casper', 'indian', 'sandra',
  'kitten', 'john', 'red123', 'gold', 'rainbow1', 'michael1', 'apollo',
  'pookie', 'amber', 'rachel', 'ranger1', 'adele', 'forest', 'buddy',
  'panther', 'test1', 'tamara', 'vincent', 'candy', 'maximus', 'money1',
  'speedy', 'samantha1', 'blue', 'fish', 'sweet', 'matrix1', 'andrew1',
  'charles', 'junior', '12345qwert', 'jasper',

  // 301-400
  'dennis', 'master1', 'wendy', 'winston', 'macintosh', 'bubba', 'apple',
  'tucker', 'jordan23', 'blahblah', 'enter', 'liverpool', 'chris', 'copper',
  'bigdick', 'sierra', 'steelers1', 'patrick', 'power1', 'patriots',
  'tester', 'diamond1', 'freedom1', 'letmein1', 'hottie', 'naughty', 'cowboy',
  'iloveu', 'halo', 'sexsex', 'ncc1701', 'taylor1', 'scotty', 'horney',
  'bigtits', 'shelter', 'horses', 'scorpion', 'drowssap', 'bear', 'wolverine',
  'pirate', 'carter', 'lucky1', 'raiders', 'angels', 'tiger1', 'password!',
  'asdfasdf', 'flyers', 'booboo', 'charger', 'dolphin', 'sharon', 'jessie',
  'richard1', 'hacker', 'babylon5', 'yomama', 'jackson', 'zachary', 'angela',
  'motocross', 'azerty', 'dickhead', 'ferrari', 'kimberly', 'pussy1', 'scooby',
  'jaguar', 'family', 'friends', 'barney', 'midnight', 'peaches', 'heaven',
  'titanic', 'nathan', 'abcdef', 'abcdefgh', 'abcdefg', 'abcde', 'abcd',
  'abc', 'dougie', 'hotdog', 'stargate', 'asshole1', 'lucky', 'gators',
  'gandalf', 'champion', 'cookie', 'nascar', 'paint', 'saints', 'spider',
  'shit', 'player1', 'popcorn', 'slayer',

  // 401-500
  'mmmmmm', 'chester', 'mercury', 'parsley', 'natalie', 'arsenal', 'bond007',
  'brenda', 'cricket', 'candy1', 'kathy', 'becky', 'assman', 'zzzzzz',
  'detroit', 'panthers', 'sheba', 'kelly', 'nelson', 'buffalo', 'ironman',
  'guinness', 'harley1', 'sparkle', 'phantom', 'oliver', 'stella', 'a1b2c3',
  'gemini', 'britney', 'sucker', 'cornell', 'samsung', 'carmen', 'beach',
  'domino', 'microsoft', 'chicken1', '1234321', '54321', 'lizbeth', 'bubbles',
  'austin1', 'shitface', 'abc12345', 'zxcv', 'star', 'leonard', 'lovely1',
  'justice', 'liverpool1', 'iloveyou1', 'asdasd', 'hannah1', 'chris1',
  'xxxxxx', 'superman1', 'asdfghjkl', 'mickey', 'garfield', 'elizabeth',
  'christin', 'maxwell', 'angel', 'yellow', 'asdf', 'blah', 'matt', 'braves',
  'access1', 'munkey', 'bobby', 'google', 'honda', 'nissan', 'toyota',
  'maverick1', 'bigdaddy', 'jessica1', 'digital', 'badboy', 'rocky',
  'warcraft', 'killer1', 'q1w2e3r4', 'potter', 'mustang1', 'redskins',
  'cowboys1', 'alpha', 'bravo', 'delta', 'omega', 'sigma', 'gamma',
  'pi314159', 'football1', 'soccer1', 'hockey1', 'baseball1',

  // 501-600
  'p@ssw0rd', 'p@ssword', 'p@ss', 'pass1234', 'pa$$word', 'passw0rd!',
  'letmein!', 'welcome!', 'admin!', 'root123', 'toor', 'adm1n', 'r00t',
  'changeme!', '123456!', 'qwerty!', 'abc123!', 'password!', 'iloveyou!',
  'master!', 'dragon!', 'monkey!', 'shadow!', 'sunshine!', 'trustno1!',
  'princess!', 'football!', 'baseball!', 'soccer!', 'hockey!',
  'zxcvbnm1', '1qazxsw2', 'zaq12wsx', '!@#$%^', '!@#$%^&*', '!@#$%^&*()',
  'qpalzm', '1q2w3e4r5t', 'asdfgh1', 'qwerty1', 'asdfjkl;', 'zxcvbnm,',
  'abcdef1', '123456789a', 'a123456789', 'a12345678', 'a1234567', 'a123456',
  'a12345', 'a1234', 'pass123', 'pass1', 'pass12', 'pass1234', 'test1234',
  'test12345', 'test12', 'temp', 'temp123', 'temp1234', 'default', 'default1',
  'default123', 'guest', 'guest1', 'guest123', 'user', 'user1', 'user123',
  'demo', 'demo123', 'login', 'login123', 'signin', 'signup', 'register',
  'backup', 'backup123', 'server', 'server123', 'system', 'system123',
  'manager', 'manager1', 'manager123', 'operator', 'operator1', 'supervisor',
  'monitor', 'control', 'service', 'service1', 'support', 'support1',
  'info', 'info123', 'office', 'office1', 'office123', 'home', 'home123',
  'work', 'work123', 'school', 'school1', 'college', 'university',

  // 601-700 - Common names and words
  'james1', 'john1', 'robert1', 'michael1', 'david1', 'william1', 'richard1',
  'joseph1', 'thomas1', 'charles1', 'christopher', 'daniel1', 'matthew1',
  'anthony1', 'mark1', 'donald', 'steven', 'paul', 'andrew1', 'joshua1',
  'kenneth', 'kevin', 'brian', 'george1', 'timothy', 'ronald', 'edward1',
  'jason', 'jeffrey', 'ryan', 'jacob', 'gary', 'nicholas', 'eric1',
  'jonathan', 'stephen1', 'larry', 'justin1', 'scott', 'brandon1',
  'benjamin', 'samuel', 'raymond', 'gregory', 'frank', 'alexander1',
  'patrick1', 'jack', 'dennis1', 'jerry', 'tyler', 'aaron', 'jose1',
  'nathan1', 'henry', 'peter', 'adam', 'douglas', 'zachary1', 'harold',
  'carl', 'arthur', 'gerald', 'roger', 'keith', 'jeremy', 'terry',
  'lawrence', 'sean', 'christian', 'albert', 'joe', 'ethan', 'austin1',
  'jesse', 'willie', 'billy', 'bryan', 'bruce', 'jordan1', 'ralph',
  'roy', 'noah', 'eugene', 'carlos', 'russell', 'bobby1', 'victor',
  'martin1', 'ernest', 'phillip', 'tod', 'jorge', 'dale', 'leonard1',
  'wayne', 'darren', 'cory', 'shane', 'ronnie', 'barry', 'freddie',

  // 701-800 - More common passwords
  'mustang1', 'ferrari1', 'porsche', 'chevy', 'dodge', 'ford', 'honda1',
  'toyota1', 'nissan1', 'subaru', 'mazda', 'lexus', 'acura', 'audi',
  'bmw', 'mercedes', 'volkswagen', 'chrysler', 'lincoln', 'cadillac',
  'buick', 'pontiac', 'saturn', 'jeep', 'hummer', 'harley1', 'yamaha1',
  'suzuki', 'kawasaki', 'honda2', 'ducati', 'victory', 'triumph',
  'pringles', 'snickers', 'skittles', 'twix', 'oreos', 'cheerios',
  'cocacola', 'pepsi', 'sprite', 'mountain', 'drpepper', 'gatorade',
  'redbull', 'monsters', 'coffee1', 'espresso', 'latte', 'mocha',
  'vanilla', 'chocolate', 'strawberry', 'blueberry', 'raspberry', 'mango',
  'pineapple', 'coconut', 'watermelon', 'cantaloupe', 'honeydew', 'kiwi',
  'papaya', 'guava', 'pomegranate', 'cranberry', 'apricot', 'peach',
  'plum', 'cherry1', 'lemon', 'lime', 'grape', 'olive', 'tomato',
  'potato', 'onion', 'garlic', 'carrot', 'celery', 'broccoli', 'spinach',
  'lettuce', 'cabbage', 'mushroom', 'pepper1', 'cucumber', 'pumpkin',
  'squash', 'zucchini', 'asparagus', 'artichoke', 'avocado', 'turnip',
  'radish', 'beet', 'corn', 'peas', 'beans', 'lentil', 'quinoa', 'rice',

  // 801-900 - Places, animals, nature
  'america1', 'canada', 'mexico', 'brazil', 'argentina', 'chile', 'peru',
  'colombia', 'venezuela', 'ecuador', 'bolivia', 'paraguay', 'uruguay',
  'france', 'germany', 'italy', 'spain', 'portugal', 'england', 'scotland',
  'ireland', 'wales', 'netherlands', 'belgium', 'switzerland', 'austria',
  'sweden', 'norway', 'denmark', 'finland', 'poland', 'czech', 'hungary',
  'romania', 'bulgaria', 'greece', 'turkey', 'egypt', 'morocco', 'nigeria',
  'kenya', 'ethiopia', 'tanzania', 'ghana', 'congo', 'senegal', 'libya',
  'china', 'japan', 'korea', 'india', 'pakistan', 'bangladesh', 'thailand',
  'vietnam', 'indonesia', 'malaysia', 'philippines', 'australia1', 'zealand',
  'fiji', 'samoa', 'tonga', 'hawaii', 'alaska', 'texas', 'california',
  'florida', 'nevada', 'oregon', 'montana', 'colorado', 'arizona', 'ohio',
  'georgia1', 'virginia', 'carolina1', 'michigan', 'illinois', 'indiana',
  'dolphin1', 'elephant', 'giraffe', 'penguin', 'kangaroo', 'gorilla',
  'leopard', 'cheetah', 'buffalo1', 'panther1', 'rhino', 'hippo', 'zebra',
  'parrot', 'falcon1', 'eagle1', 'hawk', 'crow', 'raven', 'swan', 'dove',
  'ocean', 'river1', 'mountain1', 'forest1', 'desert', 'island', 'valley',

  // 901-1000 - Entertainment, tech, misc
  'batman1', 'spiderman', 'ironman1', 'superman1', 'hulk', 'thor', 'loki',
  'wolverine1', 'avengers', 'xmen', 'starwars1', 'startrek', 'batman2',
  'superman2', 'spiderman1', 'wonder', 'flash', 'arrow', 'goku', 'naruto',
  'sasuke', 'sakura', 'pokemon', 'pikachu', 'charizard', 'mewtwo', 'snorlax',
  'minecraft', 'fortnite', 'overwatch', 'warcraft1', 'starcraft', 'diablo1',
  'skyrim', 'zelda', 'mario', 'luigi', 'peach1', 'browser', 'firefox',
  'chrome', 'safari', 'explorer', 'windows', 'linux', 'ubuntu', 'debian',
  'redhat', 'centos', 'fedora', 'macos', 'apple1', 'samsung1', 'sony',
  'nintendo', 'xbox', 'playstation', 'atari', 'segas', 'amiga', 'commodore',
  'microsoft1', 'google1', 'amazon', 'facebook', 'twitter', 'instagram',
  'linkedin', 'snapchat', 'whatsapp', 'youtube', 'netflix', 'spotify',
  'paypal', 'ebay', 'walmart', 'target1', 'bestbuy', 'costco', 'kmart',
  'nike', 'adidas', 'puma', 'reebok', 'converse', 'vans', 'filas',
  'cardinal', 'bluejay', 'robin1', 'orioles', 'marlins', 'phillies',
  'brewers', 'cubs1', 'reds1', 'pirates1', 'giants1', 'dodgers1',
  'rockies', 'padres', 'diamondbacks', 'mariners', 'angels1', 'astros1',
  'rangers1', 'royals', 'twins1', 'whitesox', 'indians1', 'yankees1',
  'mets1', 'nationals', 'braves1', 'athletics', 'bluejays', 'rays1',
]

// ─── Generate numeric patterns ───────────────────────────────────────────────
function generateNumericPatterns(): string[] {
  const patterns: string[] = []

  // 4-digit common: 0000-9999 (all 4-digit PINs)
  for (let i = 0; i <= 9999; i++) {
    patterns.push(String(i).padStart(4, '0'))
  }

  // 5-8 digit repeated patterns
  for (let len = 5; len <= 8; len++) {
    for (let d = 0; d <= 9; d++) {
      patterns.push(String(d).repeat(len))
    }
  }

  // Sequential digit patterns (4-8 digits)
  for (let len = 4; len <= 8; len++) {
    // Ascending
    for (let start = 0; start <= 9 - len + 1; start++) {
      let s = ''
      for (let i = 0; i < len; i++) s += String(start + i)
      patterns.push(s)
    }
    // Wrapping ascending
    if (len >= 5) patterns.push('12345'.slice(0, len))
    if (len >= 6) patterns.push('123456'.slice(0, len))
    if (len >= 7) patterns.push('1234567'.slice(0, len))
    if (len >= 8) patterns.push('12345678'.slice(0, len))

    // Descending
    for (let start = 9; start >= len - 1; start--) {
      let s = ''
      for (let i = 0; i < len; i++) s += String(start - i)
      patterns.push(s)
    }
    if (len >= 5) patterns.push('54321'.slice(0, len).padEnd(len, '0'))
    if (len >= 6) patterns.push('654321'.slice(0, len))
    if (len >= 7) patterns.push('7654321'.slice(0, len))
    if (len >= 8) patterns.push('87654321'.slice(0, len))
  }

  // Alternating digit patterns
  for (let a = 0; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      if (a !== b) {
        patterns.push(`${a}${b}${a}${b}`)
        patterns.push(`${a}${b}${a}${b}${a}${b}`)
        patterns.push(`${a}${b}${a}${b}${a}${b}${a}${b}`)
      }
    }
  }

  // Common years (1900-2030)
  for (let y = 1900; y <= 2030; y++) {
    patterns.push(String(y))
  }

  // Year + month combos
  for (let y = 1990; y <= 2030; y++) {
    for (let m = 1; m <= 12; m++) {
      patterns.push(`${y}${String(m).padStart(2, '0')}`)
    }
  }

  // Common date patterns (limited to keep total manageable)
  for (let y = 1990; y <= 2025; y++) {
    for (let m = 1; m <= 12; m++) {
      for (let d of [1, 15, 28, 30, 31]) {
        if (m === 2 && d > 29) continue
        if ([4, 6, 9, 11].includes(m) && d > 30) continue
        const mm = String(m).padStart(2, '0')
        const dd = String(d).padStart(2, '0')
        const yyyy = String(y)
        patterns.push(`${mm}${dd}${yyyy}`)
      }
    }
  }

  // De-duplicate
  return [...new Set(patterns)]
}

// ─── Build full password list ────────────────────────────────────────────────
function buildPasswordList(): string[] {
  const numeric = generateNumericPatterns()
  const all = [...COMMON_PASSWORDS, ...numeric]
  // De-duplicate while preserving order
  const seen = new Set<string>()
  const result: string[] = []
  for (const p of all) {
    if (!seen.has(p)) {
      seen.add(p)
      result.push(p)
    }
  }
  return result
}

// ─── Brute Force State ───────────────────────────────────────────────────────
interface BruteForceState {
  isRunning: boolean
  isComplete: boolean
  found: boolean
  foundPassword: string | null
  tried: number
  total: number
  currentPassword: string
  startTime: number
  elapsed: number
  speed: number // passwords per second
}

const initialBruteForceState: BruteForceState = {
  isRunning: false,
  isComplete: false,
  found: false,
  foundPassword: null,
  tried: 0,
  total: 0,
  currentPassword: '',
  startTime: 0,
  elapsed: 0,
  speed: 0,
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function UnlockPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [activeTab, setActiveTab] = useState<string>('known')

  // Known password mode
  const [password, setPassword] = useState('')
  const [processing, setProcessing] = useState(false)

  // Brute force mode
  const [bfState, setBfState] = useState<BruteForceState>(initialBruteForceState)
  const cancelRef = useRef(false)
  const pdfDataRef = useRef<ArrayBuffer | null>(null)

  // ─── Check if PDF is encrypted ────────────────────────────────────────────
  const checkEncrypted = useCallback(async (data: ArrayBuffer): Promise<boolean> => {
    try {
      await PDFDocument.load(data, { ignoreEncryption: false })
      return false // Not encrypted
    } catch {
      // If loading fails, it's likely encrypted
      return true
    }
  }, [])

  // ─── Known Password Unlock ────────────────────────────────────────────────
  const handleKnownUnlock = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    if (!password.trim()) {
      toast.error('Please enter the password')
      return
    }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()

      // Check if encrypted
      const isEncrypted = await checkEncrypted(arrayBuffer)
      if (!isEncrypted) {
        toast.info('This PDF is not encrypted. Downloading as-is.')
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
        saveAs(blob, 'unlocked.pdf')
        return
      }

      const pdfDoc = await PDFDocument.load(arrayBuffer, { password: password.trim() })
      pdfDoc.setTitle(pdfDoc.getTitle() || '')
      pdfDoc.setCreator('mypdftools.in')
      pdfDoc.setProducer('mypdftools.in')

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'unlocked.pdf')
      toast.success('PDF unlocked successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to unlock PDF. The password may be incorrect.')
    } finally {
      setProcessing(false)
    }
  }

  // ─── Brute Force Unlock ───────────────────────────────────────────────────
  const handleBruteForce = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file first')
      return
    }

    // Load file data
    const arrayBuffer = await files[0].arrayBuffer()
    pdfDataRef.current = arrayBuffer

    // Check if encrypted
    const isEncrypted = await checkEncrypted(arrayBuffer)
    if (!isEncrypted) {
      toast.info('This PDF is not password-protected. You can download it directly.')
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
      saveAs(blob, 'unlocked.pdf')
      return
    }

    // Build password list
    const passwordList = buildPasswordList()
    const total = passwordList.length
    cancelRef.current = false

    const startTime = Date.now()

    setBfState({
      isRunning: true,
      isComplete: false,
      found: false,
      foundPassword: null,
      tried: 0,
      total,
      currentPassword: passwordList[0] || '',
      startTime,
      elapsed: 0,
      speed: 0,
    })

    // Process passwords in chunks using setTimeout to avoid blocking UI
    const CHUNK_SIZE = 15 // passwords per chunk

    const tryPasswordsSequentially = async (
      startIdx: number,
      endIdx: number,
      pwList: string[],
      data: ArrayBuffer,
      totalPw: number,
      sTime: number
    ) => {
      if (cancelRef.current) {
        setBfState(prev => ({
          ...prev,
          isRunning: false,
          isComplete: true,
          found: false,
          elapsed: Date.now() - prev.startTime,
        }))
        toast.info('Brute force cancelled.')
        return
      }

      let foundPwd: string | null = null
      let currentTried = startIdx

      for (let i = startIdx; i < endIdx; i++) {
        if (cancelRef.current) break

        const pwd = pwList[i]
        currentTried = i + 1

        try {
          await PDFDocument.load(data.slice(0), { password: pwd })
          // If we get here, the password worked!
          foundPwd = pwd
          break
        } catch {
          // Wrong password, continue
        }
      }

      const now = Date.now()
      const elapsed = now - sTime
      const speed = currentTried > 0 ? (currentTried / (elapsed / 1000)) : 0

      if (foundPwd) {
        // Password found!
        setBfState({
          isRunning: false,
          isComplete: true,
          found: true,
          foundPassword: foundPwd,
          tried: currentTried,
          total: totalPw,
          currentPassword: foundPwd,
          startTime: sTime,
          elapsed,
          speed,
        })

        // Auto-unlock and download
        try {
          const pdfDoc = await PDFDocument.load(data.slice(0), { password: foundPwd })
          pdfDoc.setCreator('mypdftools.in')
          pdfDoc.setProducer('mypdftools.in')
          const pdfBytes = await pdfDoc.save()
          const blob = new Blob([pdfBytes], { type: 'application/pdf' })
          saveAs(blob, 'unlocked.pdf')
          toast.success(`Password found: "${foundPwd}". PDF unlocked and downloading!`)
        } catch (err) {
          console.error(err)
          toast.error('Found password but failed to unlock. Try the Known Password mode.')
        }
        return
      }

      // Update progress
      setBfState(prev => ({
        ...prev,
        tried: currentTried,
        total: totalPw,
        currentPassword: pwList[Math.min(currentTried, totalPw - 1)] || '',
        elapsed,
        speed,
      }))

      if (currentTried >= totalPw) {
        // Exhausted all passwords
        setBfState(prev => ({
          ...prev,
          isRunning: false,
          isComplete: true,
          found: false,
          tried: totalPw,
          elapsed: Date.now() - prev.startTime,
        }))
        toast.error('Password not found. The password may not be in our common passwords list.')
        return
      }

      // Schedule next chunk
      setTimeout(() => {
        tryPasswordsSequentially(currentTried, Math.min(currentTried + CHUNK_SIZE, totalPw), pwList, data, totalPw, sTime)
      }, 0)
    }

    // Start the brute force
    tryPasswordsSequentially(0, Math.min(CHUNK_SIZE, total), passwordList, arrayBuffer, total, startTime)
  }

  // ─── Cancel brute force ──────────────────────────────────────────────────
  const handleCancelBruteForce = () => {
    cancelRef.current = true
  }

  // ─── Reset brute force ───────────────────────────────────────────────────
  const handleResetBruteForce = () => {
    cancelRef.current = true
    setBfState(initialBruteForceState)
  }

  // ─── Format time ─────────────────────────────────────────────────────────
  const formatTime = (ms: number): string => {
    if (ms < 1000) return '<1s'
    const seconds = Math.floor(ms / 1000)
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    if (minutes < 60) return `${minutes}m ${remainingSeconds}s`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  // ─── Estimated time remaining ─────────────────────────────────────────────
  const getEstimatedTimeRemaining = (): string => {
    if (!bfState.isRunning || bfState.speed === 0) return 'Calculating...'
    const remaining = bfState.total - bfState.tried
    const estMs = (remaining / bfState.speed) * 1000
    return formatTime(estMs)
  }

  // ─── Progress percentage ──────────────────────────────────────────────────
  const progressPercent = bfState.total > 0
    ? Math.round((bfState.tried / bfState.total) * 100)
    : 0

  return (
    <ToolLayout
      title="Unlock PDF"
      description="Remove password protection from a PDF file — enter the password or try common passwords automatically."
      icon={<Unlock className="h-5 w-5" />}
      onBack={onBack}
    >
      {/* File Dropzone */}
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a protected PDF file here"
        description="Select a password-protected PDF"
      />

      {/* Encryption status hint */}
      {files.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
          <span>We&apos;ll check if this PDF is encrypted before processing.</span>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="known" className="gap-1.5">
            <Key className="h-3.5 w-3.5" />
            Known Password
          </TabsTrigger>
          <TabsTrigger value="bruteforce" className="gap-1.5">
            <Search className="h-3.5 w-3.5" />
            Brute Force
          </TabsTrigger>
        </TabsList>

        {/* ─── Known Password Tab ─────────────────────────────────────── */}
        <TabsContent value="known" className="mt-4 space-y-4">
          <Card className="border-dashed">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Key className="h-4 w-4 text-[#EE6C4D]" />
                Enter PDF Password
              </div>
              <p className="text-xs text-muted-foreground">
                If you know the password, enter it below to unlock the PDF instantly.
              </p>
              <div className="space-y-2">
                <Label htmlFor="unlockPassword">Password</Label>
                <Input
                  id="unlockPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the PDF password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleKnownUnlock()
                  }}
                />
              </div>
              <Button
                onClick={handleKnownUnlock}
                disabled={processing || files.length === 0 || !password.trim()}
                className="w-full"
                size="lg"
              >
                {processing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {processing ? 'Unlocking...' : 'Unlock & Download'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Brute Force Tab ────────────────────────────────────────── */}
        <TabsContent value="bruteforce" className="mt-4 space-y-4">
          <Card className="border-dashed">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Zap className="h-4 w-4 text-[#EE6C4D]" />
                Automatic Password Recovery
              </div>
              <p className="text-xs text-muted-foreground">
                Try thousands of common passwords automatically to find the correct one.
                This works best for weak or commonly-used passwords.
              </p>

              {/* Info badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  1,000+ common passwords
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  10,000 PIN codes (0000-9999)
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Numeric patterns
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Date &amp; year combos
                </Badge>
              </div>

              {/* Before running */}
              {!bfState.isRunning && !bfState.isComplete && (
                <Button
                  onClick={handleBruteForce}
                  disabled={files.length === 0}
                  className="w-full"
                  size="lg"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Start Brute Force
                </Button>
              )}

              {/* Running state */}
              {bfState.isRunning && (
                <div className="space-y-4">
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Trying passwords...
                      </span>
                      <span className="font-medium">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/40 p-3 space-y-1">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Tried
                      </div>
                      <div className="text-sm font-semibold">
                        {bfState.tried.toLocaleString()} <span className="text-muted-foreground font-normal">/ {bfState.total.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/40 p-3 space-y-1">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Speed
                      </div>
                      <div className="text-sm font-semibold">
                        {bfState.speed > 0 ? `${bfState.speed.toFixed(0)} pw/s` : '—'}
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/40 p-3 space-y-1">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Elapsed
                      </div>
                      <div className="text-sm font-semibold">
                        {formatTime(bfState.elapsed)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted/40 p-3 space-y-1">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Remaining
                      </div>
                      <div className="text-sm font-semibold">
                        {getEstimatedTimeRemaining()}
                      </div>
                    </div>
                  </div>

                  {/* Current password */}
                  <div className="rounded-lg bg-muted/30 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      Currently trying
                    </div>
                    <div className="text-sm font-mono truncate">
                      {bfState.currentPassword || '—'}
                    </div>
                  </div>

                  {/* Cancel button */}
                  <Button
                    onClick={handleCancelBruteForce}
                    variant="destructive"
                    className="w-full"
                    size="lg"
                  >
                    <StopCircle className="mr-2 h-4 w-4" />
                    Cancel Brute Force
                  </Button>
                </div>
              )}

              {/* Complete - Found */}
              {bfState.isComplete && bfState.found && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <span className="font-semibold text-green-700 dark:text-green-300">
                        Password Found!
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      The PDF password was discovered and the file has been automatically unlocked and downloaded.
                    </div>
                    <div className="rounded-lg bg-background/60 px-3 py-2 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Password
                        </div>
                        <div className="text-sm font-mono font-bold">
                          {bfState.foundPassword}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Found after {bfState.tried.toLocaleString()} attempts
                      </Badge>
                    </div>
                  </div>

                  <Button
                    onClick={handleResetBruteForce}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Try Another File
                  </Button>
                </div>
              )}

              {/* Complete - Not Found */}
              {bfState.isComplete && !bfState.found && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <span className="font-semibold text-red-700 dark:text-red-300">
                        Password Not Found
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      The password was not found in our list of {bfState.total.toLocaleString()} common passwords.
                      This PDF likely uses a strong, uncommon password. If you know the password, try the{' '}
                      <button
                        onClick={() => setActiveTab('known')}
                        className="text-[#EE6C4D] underline underline-offset-2 hover:opacity-80"
                      >
                        Known Password
                      </button>{' '}
                      tab instead.
                    </div>
                    <div className="mt-2 rounded-lg bg-background/60 px-3 py-2 text-xs text-muted-foreground">
                      Tried {bfState.tried.toLocaleString()} passwords in {formatTime(bfState.elapsed)}
                    </div>
                  </div>

                  <Button
                    onClick={handleResetBruteForce}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Try Another File
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* mypdftools branding */}
      <div className="text-center text-xs text-muted-foreground/50 pt-2">
        Powered by <span className="font-semibold">mypdftools.in</span>
      </div>
    </ToolLayout>
  )
}
