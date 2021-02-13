CREATE TABLE [dbo].[SJSS_Municipio](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Codigo] [int] NOT NULL,
	[Nome] [varchar](255) NOT NULL,
	[Uf] [char](2) NOT NULL,
 CONSTRAINT [PK_SJSS_Municipio] PRIMARY KEY CLUSTERED ([Id] ASC),
 CONSTRAINT [FK_SJSS_Municipio_SJSS_Estado] FOREIGN KEY (Uf) REFERENCES dbo.SJSS_Estado (Uf)
);
