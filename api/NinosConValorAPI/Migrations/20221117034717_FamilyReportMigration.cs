using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NinosConValorAPI.Migrations
{
    public partial class FamilyReportMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FamilyReports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    KidId = table.Column<int>(type: "integer", nullable: false),
                    SiblingsInFoundation = table.Column<int>(type: "integer", nullable: true),
                    SiblingsOutside = table.Column<int>(type: "integer", nullable: true),
                    HasExtendedFamily = table.Column<bool>(type: "boolean", nullable: true),
                    HasOriginFamily = table.Column<bool>(type: "boolean", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FamilyReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FamilyReports_Kid_KidId",
                        column: x => x.KidId,
                        principalTable: "Kid",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FamilyReports_KidId",
                table: "FamilyReports",
                column: "KidId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FamilyReports");
        }
    }
}
