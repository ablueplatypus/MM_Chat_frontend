class Chatroom < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_and_belongs_to_many :users
  # validates :topic, presence: true, uniqueness: true, case_sensitive: false

  # rails g migration CreateChatRoomsUsers user:references chatroom:references
  # This is the join table for many to many between users and the chatrooms.
  # We do not need the model when you change the relationship to has_and_belongs_to_many
  # rails db:migrate
  # == 20190122225132 CreateChatRoomsUsers: migrating =============================
  # -- create_table(:chatrooms_users)
  #   -> 0.0244s
  # == 20190122225132 CreateChatRoomsUsers: migrated (0.0245s) ====================
  # We shoveled the instance to check this worked.
  # User.first.chatrooms << Chatroom.first



end
