import time, os, platform, sys, select, math
from random import randint
from copy import copy
 
"""
Store a (x, y) coordinate of the terrain
"""
class Position:
    def __init__(self, x, y):
        self.x = x
        self.y = y 
 
"""
Representates the terrain of the map.
The terrain is a bidimensional matrix that is mapped through
a string passed
"""
class Terrain:
    GHOST = (Position(11, 4), Position(10, 6), Position(11, 6), Position(12, 6))
    PACMAN = Position(10, 8)
    GHOST_CHAR = '^'
    GHOST_WEAKEN_CHAR = '*'
    PACMAN_CHAR = '@'
    BULLET = '.'
    GREATER_BULLET = '0'
    def __init__(self):
        self.terrain = map(lambda x: list(x), """
  —————————————————— 
 |○•••|••••••••|•••○|
 |•——•|•——————•|•——•|
 |•|••••••••••••••|•|
—|•|•——•———-——•——•|•|—
  •••••••|   |••••••  
—|•|•——•——————•——•|•|—
 |•|•••••• •••••••|•|
 |•——•|•——————•|•——•|
 |○•••|••••••••|•••○|
  —————————————————— 
""".replace("•", Terrain.BULLET).replace("○", Terrain.GREATER_BULLET).replace("—", "=").split("\n"))
    def is_blocked(self, position, direction):
        try:
            if position.x == 11 and position.y == 5 and direction == Direction.UPWARD: return False 
            char = self.terrain[position.y][position.x] 
            return char == "|" or char == "=" or char == "-"
        except: return True
    """
    Makes the pacman eats bullets and increment game score in process
    """
    def eat(self, context, pacman):
        position = self.terrain[pacman.position.y][pacman.position.x]
        if position == Terrain.BULLET:
            self.terrain[pacman.position.y][pacman.position.x] = ' '
            context.context.score += 1 
        elif position == Terrain.GREATER_BULLET: 
            self.terrain[pacman.position.y][pacman.position.x] = ' '
            context.context.score += 5  
            return True
        return False
    """
    Verify is the terrain has no 'bullets'
    """
    def is_clear(self):
        for line in self.terrain:
            if '.' in line or '0' in line: return False
        return True
    @staticmethod
    def clear_screen():
        if platform.system() == "Windows": os.system("cls")
        else: os.system("clear")
    """
    Render the terrain on the screen
    """
    def render(self, pacman, ghosts):
        Terrain.clear_screen()
        matrix = []
        for i in range(len(self.terrain)):
            matrix.append(list(self.terrain[i]))
        matrix[pacman.position.y][pacman.position.x] = Terrain.PACMAN_CHAR
        for ghost in ghosts:
            if ghost.is_weaken():
                matrix[ghost.position.y][ghost.position.x] = Terrain.GHOST_WEAKEN_CHAR
            else:
                matrix[ghost.position.y][ghost.position.x] = Terrain.GHOST_CHAR
        result = ""
        for i in range(len(matrix)):
            result += "".join(matrix[i]) + "\n"
        print(result)
 
"""
Enumerate the possible directions that a walkable can take
"""
class Direction:
    FORWARD = 1
    BACKWARD = 2
    UPWARD = 3
    DOWNWARD = 4
 
"""
Representates a walkable object in the map (ghost and pacman)
"""
class Walkable:
    def __init__(self): pass
    def turn(self, direction):
        self.direction = direction
    """
    Verify if given movement in a certain direction is possible
    """
    def possible_movement(self, direction, terrain):
        if direction == Direction.FORWARD:
            return not terrain.is_blocked(Position(self.position.x + 1, self.position.y), direction)
        elif direction == Direction.BACKWARD:
            return not terrain.is_blocked(Position(self.position.x - 1, self.position.y), direction)
        elif direction == Direction.UPWARD:
            return not terrain.is_blocked(Position(self.position.x, self.position.y - 1), direction)
        elif direction == Direction.DOWNWARD:
            return not terrain.is_blocked(Position(self.position.x, self.position.y + 1), direction)
    """
    Move the object toward its direction. Return false case the movement is not possible.
    """
    def move(self, terrain):
        if self.direction == Direction.FORWARD and self.position.x >= len(terrain.terrain[self.position.y]) - 1:
            self.position.x = 0
        elif self.direction == Direction.BACKWARD and self.position.x <= 0:
            self.position.x = len(terrain.terrain[self.position.y]) - 1
        elif self.possible_movement(self.direction, terrain): 
            if self.direction == Direction.FORWARD:
                self.position.x += 1
            elif self.direction == Direction.BACKWARD:
                self.position.x -= 1
            elif self.direction == Direction.UPWARD:
                self.position.y -= 1
            elif self.direction == Direction.DOWNWARD:
                self.position.y += 1
        else: return False
        return True
 
"""
Representates the ghosts in the map.
A ghost is a walkable
"""
class Ghost(Walkable):
    def __init__(self, number):
        Walkable.__init__(self)
        self.position = copy(Terrain.GHOST[number])
        self.isWeaken = False
        self.direction = Direction.UPWARD
    """
    Verify is ghost is weaken (frightened)
    """
    def is_weaken(self):
        return self.isWeaken
    """
    Weaken the ghost, making it 'eatable' by Pacman
    """
    def weaken(self):
        self.isWeaken = True
    """
    Strengthen the ghost, making it dangerous to Pacman
    """
    def strengthen(self):
        self.isWeaken = False
 
"""
Representates the Pacman
"""
class Pacman(Walkable):
    def __init__(self):
        Walkable.__init__(self)
        self.position = copy(Terrain.PACMAN)
        self.direction = Direction.FORWARD
 
"""
Main class of the game.
It receives the input of the user and maps it to its state.
"""
class Game:
    def __init__(self):
        self.lives = 3
        self.score = 0
        self.level = 1
        self.state = StateInitial(self)
    """
    Main loop of the game
    """
    def loop(self):
        self.state.loop()
    """
    Set a direction of Pacman. Only work in StatePlaying.
    """
    def set_direction(self, direction):
        self.state.set_direction(direction)
    """
    Start a new game.
    """
    def start_new_game(self):
        self.state.start_new_game()
 
"""
Superclass of states of a game
"""
class GameState:
    def __init__(self): pass
    def loop(self):  raise NotImplementedException()
    def set_direction(self, direction): raise NotImplementedException()
    def start_new_game(self): raise NotImplementedException()
 
"""
Initial screen of the game.
"""
class StateInitial(GameState):
    def __init__(self, context):
        GameState.__init__(self)
        self.context = context
        self.context.lives = 3
        self.context.score = 0
        self.context.level = 1
    def loop(self): 
        message = """
 ____  __ __  ____   ____    __ 
|    \|  |  ||    \ /    |  /  ]   ──▒▒▒▒▒────▄████▄─────
|  o  )  |  ||  o  )  o  | /  /    ─▒─▄▒─▄▒──███▄█▀──────
|   _/|  ~  ||   _/|     |/  /     ─▒▒▒▒▒▒▒─▐████──█──█──
|  |  |___, ||  |  |  _  /   \_    ─▒▒▒▒▒▒▒──█████▄──────
|  |  |     ||  |  |  |  \     |   ─▒─▒─▒─▒───▀████▀─────
|__|  |____/ |__|  |__|__|\____|
                                
GAME CONTROLS:
-----------------------------
PRESS 'N' TO START A NEW GAME.
'A', 'S', 'D', 'W' TO MOVE.
'ESC' TO EXIT GAME.
-----------------------------
 
CREATED BY:
-----------------------------
ABNER MATHEUS (abner.math.c@gmail.com)
"""
        Terrain.clear_screen()
        print(message.decode('utf-8'))
    def set_direction(self, direction): pass
    def start_new_game(self):
        self.context.state = StatePlaying(self.context) 
 
class StateGameOver(GameState):
    def __init__(self, context):
        GameState.__init__(self)
        self.context = context
    def loop(self): 
        Terrain.clear_screen()
        print("""
  ____   ____  ___ ___    ___       ___   __ __    ___  ____  
 /    | /    ||   |   |  /  _]     /   \ |  |  |  /  _]|    \ 
|   __||  o  || _   _ | /  [_     |     ||  |  | /  [_ |  D  )
|  |  ||     ||  \_/  ||    _]    |  O  ||  |  ||    _]|    / 
|  |_ ||  _  ||   |   ||   [_     |     ||  :  ||   [_ |    \ 
|     ||  |  ||   |   ||     |    |     | \   / |     ||  .  \ 
|___,_||__|__||___|___||_____|     \___/   \_/  |_____||__|\_|
                                                              
PRESS 'N' TO START A NEW GAME.""".decode('utf-8'))
    def set_direction(self, direction): pass
    def start_new_game(self):
        self.context.state = StateInitial(self.context)
 
"""
Main state of the game.
Here is where the stuff happens.
"""
class StatePlaying(GameState):
    def __init__(self, context):
        GameState.__init__(self)
        self.context = context
        self.start_new_level()
    """
    Get the angle between two vectors.
    """
    def __get_angle(self, w1, w2):
        return math.degrees(math.atan2((w2.position.y - w1.position.y), (w2.position.x - w1.position.x)))
    """
    Convert a given angle in a direction.
    """
    def __get_direction(self, angle):
        if 0 <= angle < 45:
            return Direction.FORWARD
        elif 45 <= angle < 135:
            return Direction.UPWARD
        elif 135 <= angle < 225:
            return Direction.BACKWARD
        elif 225 <= angle < 315:
            return Direction.DOWNWARD
        elif 315 <= angle < 360:
            return Direction.FORWARD
        return Direction.FORWARD
    """
    Verify is two vectors are equal
    """
    def __equals(self, p1, p2):
        return p1.x == p2.x and p1.y == p2.y
    """
    Verify if two ghosts occupies the same tile.
    """
    def __contains_others(self, movingGhost):
        for ghost in self.ghosts:
            if ghost != movingGhost:
                if self.__equals(ghost.position, movingGhost.position): return True
        return False
    """
    Move the ghosts through the map
    """
    def __move_ghosts(self):
        for ghost in self.ghosts:
            if (self.count_loop % 2 == 0 or self.count_loop % 3) and ghost.is_weaken(): continue
            if self.count_loop % 2 == 0 and not ghost.is_weaken(): continue
            if self.__equals(ghost.position, Terrain.GHOST[0]):
                ghost.turn(Direction.FORWARD)
            elif self.__equals(ghost.position, Terrain.GHOST[1]):
                ghost.turn(Direction.FORWARD)
            elif self.__equals(ghost.position, Terrain.GHOST[2]):
                ghost.turn(Direction.UPWARD)
            elif self.__equals(ghost.position, Terrain.GHOST[3]):
                ghost.turn(Direction.BACKWARD)    
            else:
                angle = self.__get_angle(ghost, self.pacman)
                if ghost.is_weaken(): 
                    angle += 180
                ghost.turn(self.__get_direction(angle))
            old_position = copy(ghost.position)
            if ghost.direction == Direction.FORWARD:
                forbidden_direction = Direction.BACKWARD
            elif ghost.direction == Direction.BACKWARD:
                forbidden_direction = Direction.FORWARD
            elif ghost.direction == Direction.UPWARD:
                forbidden_direction = Direction.DOWNWARD
            elif ghost.direction == Direction.DOWNWARD:
                forbidden_direction = Direction.UPWARD
            count = 0 
            while self.__equals(ghost.position, old_position) or self.__contains_others(ghost):
                while True:
                    ghost.direction = randint(1, 4) 
                    if (ghost.possible_movement(ghost.direction, self.terrain) and ghost.direction != forbidden_direction) or count > 100: break
                    count += 1
                ghost.move(self.terrain)
    """
    Makes the Pacman eat (or being eaten) the ghosts, depending its state.
    """
    def __eat_ghosts(self):
        for i in range(len(self.ghosts)):
            if self.__equals(self.ghosts[i].position, self.pacman.position):
                if self.ghosts[i].is_weaken():
                    self.ghosts[i].strengthen()
                    self.ghosts[i].position = copy(Terrain.GHOST[i])
                else:
                    self.lose_live()
    """
    Render the screen (terrain + info)
    """
    def __render(self):
        self.terrain.render(self.pacman, self.ghosts)
        print("LIVES: %d    SCORE: %d    LEVEL: %d" % (self.context.lives, self.context.score, self.context.level))
    def loop(self): 
        self.count_loop += 1
        if self.terrain.is_clear():
            print("""
CONGRATULATIONS! 
A NEW LEVEL WILL START IN FEW SECONDS.""".decode('utf-8'))
            time.sleep(1)
            self.context.level += 1
            self.start_new_level()
        self.__move_ghosts()
        self.pacman.move(self.terrain)
        self.__eat_ghosts()
        if self.countdown > 0: self.countdown -= 1
        else:
            for ghost in self.ghosts: ghost.strengthen()
        if self.terrain.eat(self, self.pacman):
            for ghost in self.ghosts: ghost.weaken()
            self.countdown = 15
        self.__render()
    def set_direction(self, direction):
        if self.pacman.possible_movement(direction, self.terrain):
            self.pacman.turn(direction)
    def start_new_game(self):
        self.context.state = StateInitial(self.context)
    """
    Start a new level. On a new level, lives and points are mantained.
    """
    def start_new_level(self):
        self.terrain = Terrain()
        self.pacman = Pacman()
        self.ghosts = []
        for i in range(4): self.ghosts.append(Ghost(i))
        self.count_loop = 0
        self.countdown = 0
    """
    Makes Pacman lose a life. 
    """
    def lose_live(self):
        self.context.lives -= 1
        if self.context.lives <= 0:
            self.context.state = StateGameOver(self.context)
        else:
            self.__render()
            print("""
YOU LOST A LIVE.""".decode('utf-8'))
            time.sleep(2)
            self.pacman = Pacman()
            self.pacman = Pacman()
            self.ghosts = []
            for i in range(4): self.ghosts.append(Ghost(i))
            self.count_loop = 0
            self.countdown = 0
 
#---------------------------------
# IO MANAGER
#---------------------------------
def controller_windows():
	import Tkinter
	class Controller:
		SPEED = 0.2
		def __init__(self):
			self.game = Game() 
			self.start_game()
		def press_key(self, event):
			key = event.keysym.lower()
			if key == "escape": #ESC
				return False
			elif key == "n": #Enter
				self.game.start_new_game()
			elif key == "d": #Right arrow
				self.game.set_direction(Direction.FORWARD)
			elif key == "a": #Left arrow
				self.game.set_direction(Direction.BACKWARD)
			elif key == "w": #Up arrow
				self.game.set_direction(Direction.UPWARD)
			elif key == "s": #Down arrow
				self.game.set_direction(Direction.DOWNWARD)
			return True
		def loop(self):
			self.game.loop()   
			self.console.after(250, self.loop)
		def start_game(self):
			self.console = Tkinter.Tk()
			self.console.bind_all('<Key>', self.press_key)
			self.console.withdraw()
			try:
				self.console.after(250, self.loop)
				self.console.mainloop()
			except KeyboardInterrupt: pass
	Controller()
 
def controller_unix():
	import termios, tty, thread
	class NonBlockingConsole(object):
		def __enter__(self):
			self.old_settings = termios.tcgetattr(sys.stdin)
			tty.setcbreak(sys.stdin.fileno())
			return self
		def __exit__(self, type, value, traceback):
			termios.tcsetattr(sys.stdin, termios.TCSADRAIN, self.old_settings)
		def get_data(self):
			if select.select([sys.stdin], [], [], 0) == ([sys.stdin], [], []):
				return sys.stdin.read(1)
			return False
				
	class Controller:
		SPEED = 0.2
		def __init__(self):
			self.game = Game() 
			self.start_game()
		def press_key(self, nbc):
			key = str(nbc.get_data())
			if key == '\x1b': #ESC
				return False
			elif key == 'n': #Enter
				self.game.start_new_game()
			elif key == 'd': #Right arrow
				self.game.set_direction(Direction.FORWARD)
			elif key == 'a': #Left arrow
				self.game.set_direction(Direction.BACKWARD)
			elif key == 'w': #Up arrow
				self.game.set_direction(Direction.UPWARD)
			elif key == 's': #Down arrow
				self.game.set_direction(Direction.DOWNWARD)
			return True
		def loop(self, threadName): 
			while self.running:
				time.sleep(Controller.SPEED)
				self.game.loop()   
		def start_game(self):
			self.running = True
			thread.start_new_thread(self.loop, ("Thread-1",))
			try:
				with NonBlockingConsole() as nbc:
					while self.press_key(nbc): pass
			except KeyboardInterrupt: pass
			self.running = False
	Controller()
	
if __name__ == '__main__':
    if platform.system() == "Windows":
        controller_windows()
    else:
        controller_unix()
