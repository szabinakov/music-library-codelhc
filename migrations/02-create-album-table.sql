CREATE TABLE Albums (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    artistId SERIAL,
	PRIMARY KEY(id),
	CONSTRAINT fk_artist
		FOREIGN KEY(artistId) 
			REFERENCES Artists(id)
)