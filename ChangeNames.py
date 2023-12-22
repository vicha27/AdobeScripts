import os

keyword = 'Eagle'
attack = 'attacking'
attackCounter = 1
chant = 'chanting'
chantCounter = 1
cheer = 'cheering'
cheerCounter = 1
cry = 'crying'
cryCounter = 1
dance = 'dancing'
danceCounter = 1
defend = 'defending'
defendCounter = 1
joke = 'joking'
jokeCounter = 1
laugh = 'laughing'
laughCounter = 1
scream = 'screaming'
screamCounter = 1
sleep = 'sleeping'
sleepCounter = 1
folder = "C:/Users/Asus/Downloads/Test Pack"

# Iterate
for file in os.listdir(folder):
    oldName = os.path.join(folder, file)
    n = os.path.splitext(file)[0]
    print(n)
    # Checking if the file is present in the list
    if file.__contains__(attack):
        b = keyword + attack.capitalize() + str(attackCounter) + '.png'
        attackCounter=attackCounter+1
        newName = os.path.join(folder, b)
    elif file.__contains__(chant):
        b = keyword + chant.capitalize() + str(chantCounter) + '.png'
        chantCounter=chantCounter+1
        newName = os.path.join(folder, b)
    elif file.__contains__(cheer):
        b = keyword + cheer.capitalize() + str(cheerCounter) + '.png'
        cheerCounter=cheerCounter+1
        newName = os.path.join(folder, b)
    elif file.__contains__(cry):
        b = keyword + cry.capitalize() + str(cryCounter) + '.png'
        cryCounter=cryCounter+1
        newName = os.path.join(folder, b)
    elif file.__contains__(dance):
        b = keyword + dance.capitalize() + str(danceCounter) + '.png'
        danceCounter=danceCounter+1
        newName = os.path.join(folder, b)
    elif file.__contains__(defend):
        b = keyword + defend.capitalize() + str(defendCounter) + '.png'
        defendCounter=defendCounter+1
        newName = os.path.join(folder, b)
    elif file.__contains__(joke):
        b = keyword + joke.capitalize() + str(jokeCounter) + '.png'
        jokeCounter=jokeCounter+1
        newName = os.path.join(folder, b)
    elif file.__contains__(laugh):
        b = keyword + laugh.capitalize() + str(laughCounter) + '.png'
        laughCounter=laughCounter+1
        newName = os.path.join(folder, b)
    elif file.__contains__(scream):
        b = keyword + scream.capitalize() + str(screamCounter) + '.png'
        screamCounter=screamCounter+1
        newName = os.path.join(folder, b)
    elif file.__contains__(sleep):
        b = keyword + sleep.capitalize() + str(sleepCounter) + '.png'
        sleepCounter=sleepCounter+1
        newName = os.path.join(folder, b)
    # Rename the file
    os.rename(oldName, newName)