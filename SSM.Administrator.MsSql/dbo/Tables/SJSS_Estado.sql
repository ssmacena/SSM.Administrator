CREATE TABLE [dbo].[SJSS_Estado](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CodigoUf] [int] NOT NULL,
	[Nome] [varchar](50) NOT NULL,
	[Uf] [char](2) NOT NULL,
	[Regiao] [int] NOT NULL,
 CONSTRAINT [PK_SJSS_Estado] PRIMARY KEY CLUSTERED ([Id] ASC),
 CONSTRAINT [UK_SJSS_Estado] UNIQUE NONCLUSTERED ( [Uf] ASC )
);

