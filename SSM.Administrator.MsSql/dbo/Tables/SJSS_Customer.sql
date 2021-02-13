CREATE TABLE [dbo].[SJSS_Customer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NM_Cliente] [varchar](256) NOT NULL,
	[DS_Email] [nvarchar](256) NOT NULL,
	[DS_EmailConfirmar] [nvarchar](256) NOT NULL,
	[DS_Cep] [nvarchar](15) NOT NULL,
	[NR_Endereco] [int] NULL,
	[DS_Complemento] [nvarchar](512) NULL,
	[DS_Rua] [nvarchar](256) NOT NULL,
	[DS_Bairro] [nvarchar](256) NOT NULL,
	[SG_Estado] [nvarchar](5) NOT NULL,
	[DS_Cidade] [nvarchar](256) NOT NULL,
	[DT_Criacao] [datetime] NOT NULL,
	[ID_UserCriacao] [nvarchar](450) NOT NULL,
	[DT_Alteracao] [datetime] NULL,
	[ID_UserAlteracao] [nvarchar](450) NULL,
 CONSTRAINT [PK_SJSS_Customer] PRIMARY KEY CLUSTERED ([Id] ASC)
);
