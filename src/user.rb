class User < ApplicationRecord
  has_secure_password
  has_many :messages
  has_and_belongs_to_many :chatrooms
  # validates :username, uniqueness: { case_sensetive: false}

# need this reader method to take in the table key for passwords which is password_digest
  def password
    @password_digest
  end

  def password=(pass)
    self.password_digest = BCrypt::Password.create(pass)
  end






end
