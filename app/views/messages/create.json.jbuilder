json.content @message.content 
json.date    @message.created_at.to_s
json.user_name @message.user.name
json.image   @message.image.url
json.id @message.id