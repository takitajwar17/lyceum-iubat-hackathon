export const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  csharp: "6.12.0",
  php: "8.2.3", 
  java: "15.0.2",
  typescript: "5.0.3",
  javascript: "18.15.0"
};

export const CODE_SNIPPETS = {
  python: '\ndef welcome_message(traveler):\n\tprint(f"Greetings, {traveler}!")\n\nwelcome_message("wanderer")\n',
  csharp: 'using System;\n\nnamespace PersonGreeting\n{\n\tclass Greeter { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Welcome, traveler!");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$greeting = 'Welcome';\n$person = 'visitor';\necho $greeting . ', ' . $person . '!';\n",
  java: '\npublic class PersonalGreeting {\n\tpublic static void main(String[] args) {\n\t\tString message = "Welcome, adventurer!";\n\t\tSystem.out.println(message);\n\t}\n}\n',
  typescript: '\ninterface Visitor {\n\tname: string;\n}\n\nfunction welcomeGuest(guest: Visitor) {\n\tconsole.log(`Welcome aboard, ${guest.name}!`);\n}\n\nwelcomeGuest({ name: "explorer" });\n',
  javascript: '\nfunction welcomePerson(name) {\n\tconsole.log("A warm welcome to " + name + "!");\n}\n\nwelcomePerson("traveler");\n'
};