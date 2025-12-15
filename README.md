Social Media Project mit Fokus auf Musik, mp3/wav dateien+cover hochladen, liken, kommentare schreiben, accounts anlegen, tags basierend auf genre, im optimalfall ähnliche Musik vorschlagen lassen können

Profile Page:
  getProfileData(Account):
    return AccountName, AccountDescription, AccountCreationDate, FavouriteGenre(based on likes), AccountSongs
    
history page:
  getAccountHistory(Account):
    return [SongTitle, SongPreviewPicture, Liked?!, TimeWatched]


Home page:
  getRecommendation()
    return [SongTitle, SongPicture, SongDescription]

  postListeningInformation(ListenTime)

  postLike() #Saves that this song was liked
  
