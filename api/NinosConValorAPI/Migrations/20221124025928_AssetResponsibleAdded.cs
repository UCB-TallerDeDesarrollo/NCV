using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class AssetResponsibleAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssetResponsibleId",
                table: "FixedAsset",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AssetResponsibleEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Deleted = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetResponsibleEntity", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FixedAsset_AssetResponsibleId",
                table: "FixedAsset",
                column: "AssetResponsibleId");

            migrationBuilder.AddForeignKey(
                name: "FK_FixedAsset_AssetResponsibleEntity_AssetResponsibleId",
                table: "FixedAsset",
                column: "AssetResponsibleId",
                principalTable: "AssetResponsibleEntity",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FixedAsset_AssetResponsibleEntity_AssetResponsibleId",
                table: "FixedAsset");

            migrationBuilder.DropTable(
                name: "AssetResponsibleEntity");

            migrationBuilder.DropIndex(
                name: "IX_FixedAsset_AssetResponsibleId",
                table: "FixedAsset");

            migrationBuilder.DropColumn(
                name: "AssetResponsibleId",
                table: "FixedAsset");
        }
    }
}
