<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.5" tiledversion="1.7.1" name="testTileset" tilewidth="32" tileheight="32" tilecount="36" columns="6">
 <image source="../../artwork/tileset.png" width="192" height="192"/>
 <tile id="0">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="1">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="2">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="3">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="4">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="5">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="6">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="7">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="8">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="9">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="10">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="11">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="12">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="13">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="14">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="15">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="16">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="expValue" type="int" value="3"/>
   <property name="isFlying" type="bool" value="true"/>
   <property name="level" type="int" value="1"/>
   <property name="objectTag" value="slimeEnemy"/>
  </properties>
 </tile>
 <tile id="17">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="expValue" type="int" value="3"/>
   <property name="isFlying" type="bool" value="false"/>
   <property name="level" type="int" value="1"/>
   <property name="objectTag" value="slimeEnemy"/>
  </properties>
 </tile>
 <tile id="18">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="19">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="20">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="21">
  <properties>
   <property name="collides" type="bool" value="true"/>
  </properties>
 </tile>
 <tile id="22">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="expValue" type="int" value="5"/>
   <property name="isFlying" type="bool" value="true"/>
   <property name="level" type="int" value="2"/>
   <property name="objectTag" value="slimeEnemy"/>
  </properties>
 </tile>
 <tile id="23">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="expValue" type="int" value="5"/>
   <property name="isFlying" type="bool" value="false"/>
   <property name="level" type="int" value="2"/>
   <property name="objectTag" value="slimeEnemy"/>
  </properties>
 </tile>
 <tile id="24">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="direction" value="right"/>
   <property name="objectTag" value="spike"/>
   <property name="spriteName" value="rightSpikes"/>
  </properties>
 </tile>
 <tile id="25">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="direction" value="left"/>
   <property name="objectTag" value="spike"/>
   <property name="spriteName" value="leftSpikes"/>
  </properties>
 </tile>
 <tile id="26">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="direction" value="down"/>
   <property name="objectTag" value="spike"/>
   <property name="spriteName" value="downSpikes"/>
  </properties>
 </tile>
 <tile id="27">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="direction" value="up"/>
   <property name="objectTag" value="spike"/>
   <property name="spriteName" value="upSpikes"/>
  </properties>
 </tile>
 <tile id="28">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="expValue" type="int" value="10"/>
   <property name="isFlying" type="bool" value="true"/>
   <property name="level" type="int" value="3"/>
   <property name="objectTag" value="slimeEnemy"/>
  </properties>
 </tile>
 <tile id="29">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="expValue" type="int" value="10"/>
   <property name="isFlying" type="bool" value="false"/>
   <property name="level" type="int" value="3"/>
   <property name="objectTag" value="slimeEnemy"/>
  </properties>
 </tile>
 <tile id="30">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="objectTag" value="endOfLevel"/>
  </properties>
 </tile>
 <tile id="31">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="objectTag" value="pickUp"/>
   <property name="pickUpType" value="doubleJump"/>
   <property name="spriteName" value="doubleJump"/>
  </properties>
 </tile>
 <tile id="32">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="objectTag" value="pickUp"/>
  </properties>
 </tile>
 <tile id="33">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="34">
  <properties>
   <property name="collides" type="bool" value="false"/>
  </properties>
 </tile>
 <tile id="35">
  <properties>
   <property name="collides" type="bool" value="false"/>
   <property name="objectTag" value="playerSpawn"/>
  </properties>
 </tile>
</tileset>
