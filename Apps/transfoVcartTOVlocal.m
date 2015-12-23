function [Vloc]=transfoVcartTOVlocal(Vcart, lambda, phi)
	%Transformation de la vitesse en cartésienne en vitesse en coordonnée locale
	R = [ -sin(lambda) -sin(phi)*cos(lambda) cos(phi)*cos(lambda) ; cos(lambda) -sin(phi)*sin(lambda) cos(phi)*sin(lambda) ; 0 cos(phi) sin(phi)];
	Vloc = R' *Vcart;
	

end
