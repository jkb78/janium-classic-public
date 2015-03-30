DROP TABLE themes;

CREATE TABLE themes (
    theme character varying(100) NOT NULL,
    description character varying(100) NOT NULL,
    primary_color character varying(30) NOT NULL,
    icon character varying(30) NOT NULL,
    active_theme integer NOT NULL
);

CREATE UNIQUE INDEX ix_themes ON themes (theme);
CREATE INDEX ix_desc_themes ON themes (description);

INSERT INTO themes VALUES ('aka', 'Aka', '#ae131f', 'tint', 1);
INSERT INTO themes VALUES ('ao', 'Ao', '#496cad', 'tint', 1);
INSERT INTO themes VALUES ('midori', 'Midori', '#6f8745', 'tint', 1);
INSERT INTO themes VALUES ('mizuiro', 'Mizuiro', '#33b5e5', 'tint', 1);
INSERT INTO themes VALUES ('momoiro', 'Momoiro', '#b94b6f', 'tint', 1);
INSERT INTO themes VALUES ('murasaki', 'Murasaki', '#86618f', 'tint', 1);
INSERT INTO themes VALUES ('orenji', 'Orenji', '#f16022', 'tint', 1);
INSERT INTO themes VALUES ('deep-blue', 'Deep Blue', '#2b3e50', 'adjust', 1);
INSERT INTO themes VALUES ('janium-one', 'JaniumOne', '#008cba', 'adjust', 0);
INSERT INTO themes VALUES ('modern', 'Modern', '#007fff', 'adjust', 1);
INSERT INTO themes VALUES ('navy', 'Navy', '#2c3e50', 'adjust', 1);
INSERT INTO themes VALUES ('oneedoc', 'OneEDOC', '#008cba', 'adjust', 1);
INSERT INTO themes VALUES ('simply-red', 'Simply Red', '#d9230f', 'adjust', 1);
--INSERT INTO themes VALUES ('', '', '', '', 1);
